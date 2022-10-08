import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { ErrorService } from '../../shared/error/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [ErrorService],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {
    this.registerForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwords: fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: this.passwordConfirm }
      ),
    });
  }

  ngOnInit(): void {}

  passwordConfirm(c: AbstractControl) {
    if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit() {
    if (!this.registerForm.valid) return;

    const userCredentials = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      ...this.registerForm.value.passwords,
    };

    const register$ = this.authService.register(userCredentials);

    this.loadingService
      .showLoaderUntilComplete(register$)
      .pipe(
        catchError((err) => {
          this.errorService.showError('Error');
          return throwError(() => new Error(err));
        })
      )
      .subscribe();
  }
}
