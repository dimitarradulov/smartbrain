import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, shareReplay, tap, switchMap, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

export interface FaceDetectionData {
  id: string;
  region_info: {
    bounding_box: {
      bottom_row: number;
      top_row: number;
      left_col: number;
      right_col: number;
    };
  };
  data: { concepts: any[] };
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class FaceRecognitionService {
  private imageLinkChange = new BehaviorSubject<string>('');
  imageLink$ = this.imageLinkChange.asObservable();

  //prettier-ignore
  private imagePredictionDataChange = new BehaviorSubject<FaceDetectionData[]>([]);
  imagePredictionData$ = this.imagePredictionDataChange.asObservable();

  private entriesChange = new BehaviorSubject<number>(0);
  entries$ = this.entriesChange.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  retrieveImageLink(imageLink: string) {
    this.imageLinkChange.next(imageLink);
  }

  resetImageLink() {
    this.imageLinkChange.next('');
  }

  getImagePrediction() {
    const imageLink = this.imageLinkChange.getValue();

    return this.http
      .post<any>(`${environment.baseUrl}/image-url`, { imageLink })
      .pipe(
        map((response) => response['outputs'].at(0).data.regions),
        tap((data) => this.imagePredictionDataChange.next(data)),
        switchMap(() => this.incrementUserEntryCount()),
        shareReplay()
      );
  }

  incrementUserEntryCount() {
    return this.authService.user$.pipe(
      take(1),
      switchMap((user) => {
        const incrementEntry$ = this.http.put<number>(
          `${environment.baseUrl}/image`,
          { id: user?.id }
        );
        return forkJoin([of(user), incrementEntry$]);
      }),
      tap(([user, entries]) => {
        this.entriesChange.next(entries);
        localStorage.setItem('user', JSON.stringify({ ...user, entries }));
      })
    );
  }

  getUserEntryCount() {
    return this.authService.user$.pipe(
      take(1),
      map((user) => +user?.entries!),
      tap((entries) => this.entriesChange.next(entries))
    );
  }
}
