import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorService } from './error.service';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorMessage$: Observable<string>;

  constructor(private erorrService: ErrorService) { }

  ngOnInit(): void {
    this.errorMessage$ = this.erorrService.errorMessage$;
  }

}
