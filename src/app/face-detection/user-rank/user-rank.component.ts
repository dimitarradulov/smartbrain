import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { FaceRecognitionService } from '../face-recognition.service';

@Component({
  selector: 'user-rank',
  templateUrl: './user-rank.component.html',
  styleUrls: ['./user-rank.component.css'],
})
export class UserRankComponent implements OnInit {
  entries$: Observable<number>;
  user$: Observable<User | null>;

  constructor(
    private faceRecognitionService: FaceRecognitionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.faceRecognitionService.getUserEntryCount().subscribe();

    this.entries$ = this.faceRecognitionService.entries$;
    this.user$ = this.authService.user$;
  }
}
