import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { LoadingService } from 'src/app/shared/loading/loading.service';

import {
  FaceDetectionData,
  FaceRecognitionService,
} from '../face-recognition.service';

@Component({
  selector: 'face-recognition',
  templateUrl: './face-recognition.component.html',
  styleUrls: ['./face-recognition.component.css'],
  providers: [LoadingService],
})
export class FaceRecognitionComponent implements OnInit, OnDestroy {
  imageLink$: Observable<string>;
  imagePredictionData$: Observable<FaceDetectionData[]>;
  data$: Observable<{ imageLink: string; predictionData: FaceDetectionData[] }>;
  @ViewChild('imageEl', { static: true }) imageEl: ElementRef;

  constructor(
    private faceRecognitionService: FaceRecognitionService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.imageLink$ = this.faceRecognitionService.imageLink$;
    this.imagePredictionData$ =
      this.faceRecognitionService.imagePredictionData$;

    this.data$ = combineLatest([
      this.imageLink$,
      this.imagePredictionData$,
    ]).pipe(
      map(([imageLink, predictionData]) => {
        return {
          imageLink,
          predictionData,
        };
      })
    );
  }

  ngOnDestroy(): void {
    this.faceRecognitionService.resetImageLink();
  }
}
