import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any>;

    return this.authService.user$.pipe(
      take(1),
      tap((user) => {
        if (!user?.token) {
          authReq = req.clone();
        } else {
          authReq = req.clone({
            headers: new HttpHeaders().set(
              'authorization',
              `Bearer ${user.token}`
            ),
          });
        }
      }),
      switchMap(() => next.handle(authReq))
    );
  }
}
