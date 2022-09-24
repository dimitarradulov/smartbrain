import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgParticlesModule } from 'ng-particles';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { boxArrowLeft } from 'ngx-bootstrap-icons';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ImageLinkFormComponent } from './image-link-form/image-link-form.component';
import { FaceRecognitionComponent } from './face-recognition/face-recognition.component';
import { UserRankComponent } from './user-rank/user-rank.component';

const icons = {
  boxArrowLeft,
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ImageLinkFormComponent,
    FaceRecognitionComponent,
    UserRankComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgParticlesModule,
    NgxBootstrapIconsModule.pick(icons, {
      width: '1.5rem',
      height: '1.5rem',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
