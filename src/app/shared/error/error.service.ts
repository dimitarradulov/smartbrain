import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ErrorService {
	private errorMessageChange = new BehaviorSubject<string>('');
	errorMessage$ = this.errorMessageChange.asObservable();

	showError(message: string) {
		this.errorMessageChange.next(message);
	}
}