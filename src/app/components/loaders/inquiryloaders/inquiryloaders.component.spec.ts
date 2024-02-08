import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryloadersComponent } from './inquiryloaders.component';

describe('InquiryloadersComponent', () => {
  let component: InquiryloadersComponent;
  let fixture: ComponentFixture<InquiryloadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryloadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiryloadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
