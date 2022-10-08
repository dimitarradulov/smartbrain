import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLinkFormComponent } from './image-link-form.component';

describe('ImageLinkFormComponent', () => {
  let component: ImageLinkFormComponent;
  let fixture: ComponentFixture<ImageLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageLinkFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
