import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorService } from 'src/app/shared/error/error.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  providers: [ErrorService],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {
    this.signInForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.signInForm.valid) return;

    const signIn$ = this.authService.signIn(this.signInForm.value);

    this.loadingService
      .showLoaderUntilComplete(signIn$)
      .pipe(
        catchError((err) => {
          this.errorService.showError(err.error);
          return throwError(() => new Error(err.error));
        })
      )
      .subscribe();
  }
}
