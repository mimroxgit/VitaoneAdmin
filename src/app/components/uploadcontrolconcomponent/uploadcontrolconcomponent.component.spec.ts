import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcontrolconcomponentComponent } from './uploadcontrolconcomponent.component';

describe('UploadcontrolconcomponentComponent', () => {
  let component: UploadcontrolconcomponentComponent;
  let fixture: ComponentFixture<UploadcontrolconcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadcontrolconcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadcontrolconcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
