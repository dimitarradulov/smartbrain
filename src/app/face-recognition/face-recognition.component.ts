import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FaceRecognitionService } from '../face-recognition.service';

@Component({
  selector: 'face-recognition',
  templateUrl: './face-recognition.component.html',
  styleUrls: ['./face-recognition.component.css'],
})
export class FaceRecognitionComponent implements OnInit {
  imageLink$: Observable<string>;

  constructor(private faceRecognitionService: FaceRecognitionService) {}

  ngOnInit(): void {
    this.imageLink$ = this.faceRecognitionService.imageLink$;
  }
}
