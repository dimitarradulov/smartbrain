import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FaceRecognitionComponent } from './face-recognition/face-recognition.component';
import { ImageLinkFormComponent } from './image-link-form/image-link-form.component';
import { UserRankComponent } from './user-rank/user-rank.component';
import { FaceDetectionComponent } from './face-detection.component';
import { FaceDetectionBoxDirective } from './face-recognition/face-detection-box.directive';

const routes: Routes = [{ path: '', component: FaceDetectionComponent }];

@NgModule({
  declarations: [
    FaceRecognitionComponent,
    ImageLinkFormComponent,
    UserRankComponent,
    FaceDetectionComponent,
    FaceDetectionBoxDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaceDetectionModule {}
