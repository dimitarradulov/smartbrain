import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { asyncScheduler, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';

interface AuthResponseData {
  email: string;
  entries: string;
  id: string;
  name: string;
  token: string;
  tokenExpiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userChange = new BehaviorSubject<User | null>(null);
  user$ = this.userChange.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  signIn(userCredentials: { email: string; password: string }) {
    const { email, password } = userCredentials;

    return this.http
      .post<AuthResponseData>(`${environment.baseUrl}/sign-in`, {
        email,
        password,
      })
      .pipe(tap((userData) => this.handleAuth(userData)));
  }

  register(userCredentials: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    return this.http
      .post<AuthResponseData>(
        `${environment.baseUrl}/register`,
        userCredentials
      )
      .pipe(tap((userData) => this.handleAuth(userData)));
  }

  autoLogin() {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);

    const tokenExpirationDate = new Date(parsedUser._tokenExpirationDate);

    const user = new User(
      parsedUser.email,
      parsedUser.entries,
      parsedUser.id,
      parsedUser.name,
      parsedUser._token,
      tokenExpirationDate
    );

    if (!user.token) return;

    this.userChange.next(user);

    console.log('hehe');

    this.autoLogout(
      new Date(tokenExpirationDate).getTime() - new Date().getTime()
    );
  }

  autoLogout(expirationTime: number) {
    asyncScheduler.schedule(this.logout, expirationTime);
  }

  logout() {
    localStorage.removeItem('user');
    this.userChange.next(null);
  }

  private handleAuth(userData: AuthResponseData) {
    const tokenExpirationDate = new Date(
      new Date().getTime() + +userData.tokenExpiresIn
    );

    const user = new User(
      userData.email,
      +userData.entries,
      userData.id,
      userData.name,
      userData.token,
      tokenExpirationDate
    );

    this.userChange.next(user);

    localStorage.setItem('user', JSON.stringify(user));

    this.autoLogout(+userData.tokenExpiresIn);

    this.router.navigate(['/']);
  }
}
