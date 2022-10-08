import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private loadingChange = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingChange.asObservable();

  constructor() {}

  showLoaderUntilComplete<T>(obs$: Observable<T>) {
    return of(null).pipe(
      tap(() => this.loadingChange.next(true)),
      switchMap(() => obs$),
      finalize(() => this.loadingChange.next(false))
    );
  }

  startLoading() {
    this.loadingChange.next(true);
  }

  stopLoading() {
    this.loadingChange.next(false);
  }
}
