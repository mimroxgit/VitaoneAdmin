import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdDiscountDetailloaderComponent } from './prd-discount-detailloader.component';

describe('PrdDiscountDetailloaderComponent', () => {
  let component: PrdDiscountDetailloaderComponent;
  let fixture: ComponentFixture<PrdDiscountDetailloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdDiscountDetailloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrdDiscountDetailloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
