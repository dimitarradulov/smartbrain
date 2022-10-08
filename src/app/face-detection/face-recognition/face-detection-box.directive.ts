import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

import { FaceDetectionData } from '../face-recognition.service';

@Directive({ selector: '[faceDetectionBox]' })
export class FaceDetectionBoxDirective implements OnInit {
  @Input('faceDetectionBox') clarifaiFaceData: FaceDetectionData;
  @Input() image: HTMLImageElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    setTimeout(() => {
      const calucatedFaceLocation = this.calculateFaceLocation();

      this.setCalculatedBoundingBox(calucatedFaceLocation);
    }, 1000);
  }

  private calculateFaceLocation() {
    const clarifaiFaceBoundingBox =
      this.clarifaiFaceData.region_info.bounding_box;
    const imageWidth = +this.image.offsetWidth;
    const imageHeight = +this.image.offsetHeight;

    return {
      left: clarifaiFaceBoundingBox.left_col * imageWidth,
      right: imageWidth - clarifaiFaceBoundingBox.right_col * imageWidth,
      top: clarifaiFaceBoundingBox.top_row * imageHeight,
      bottom: imageHeight - clarifaiFaceBoundingBox.bottom_row * imageHeight,
    };
  }

  private setCalculatedBoundingBox(
    calculatedFaceLocation: Record<string, number>
  ) {
    const calculatedFaceLocationArr = Object.entries(calculatedFaceLocation);

    calculatedFaceLocationArr.forEach(([locationName, locationValue]) => {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        locationName,
        locationValue + 'px'
      );
    });
  }
}
