import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetinquiryComponent } from './getinquiry.component';

describe('GetinquiryComponent', () => {
  let component: GetinquiryComponent;
  let fixture: ComponentFixture<GetinquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetinquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetinquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
