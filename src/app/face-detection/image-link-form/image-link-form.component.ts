import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaceRecognitionService } from '../face-recognition.service';

@Component({
  selector: 'image-link-form',
  templateUrl: './image-link-form.component.html',
  styleUrls: ['./image-link-form.component.css'],
})
export class ImageLinkFormComponent implements OnInit {
  imageLinkForm: FormGroup;
  validImageUrlRegex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  constructor(
    private fb: FormBuilder,
    private faceRecognitionService: FaceRecognitionService
  ) {
    this.imageLinkForm = fb.group({
      imageLink: [
        '',
        [Validators.required, Validators.pattern(this.validImageUrlRegex)],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.imageLinkForm.valid) return;

    const imageLink: string = this.imageLinkForm.get('imageLink')?.value;

    this.faceRecognitionService.retrieveImageLink(imageLink);

    this.faceRecognitionService.getImagePrediction().subscribe();

    this.imageLinkForm.reset();
  }
}
