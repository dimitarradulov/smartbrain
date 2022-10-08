import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgParticlesModule } from 'ng-particles';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { boxArrowLeft, boxArrowInRight, personPlus } from 'ngx-bootstrap-icons';

import { AuthModule } from './auth/auth.module';
import { FaceDetectionModule } from './face-detection/face-detection.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

const icons = {
  boxArrowLeft,
  boxArrowInRight,
  personPlus,
};

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgParticlesModule,
    NgxBootstrapIconsModule.pick(icons, {
      width: '1.5rem',
      height: '1.5rem',
    }),
    AppRoutingModule,
    AuthModule,
    FaceDetectionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
