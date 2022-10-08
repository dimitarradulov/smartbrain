import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './loading/loading.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [LoadingComponent, ErrorComponent],
  imports: [CommonModule],
  exports: [LoadingComponent, ErrorComponent],
})
export class SharedModule {}
