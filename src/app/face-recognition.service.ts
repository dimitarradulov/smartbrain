import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaceRecognitionService {
  private imageLinkChange = new Subject<string>();
  imageLink$ = this.imageLinkChange.asObservable();

  constructor() {}

  retrieveImageLink(imageLink: string) {
    this.imageLinkChange.next(imageLink);
  }
}
