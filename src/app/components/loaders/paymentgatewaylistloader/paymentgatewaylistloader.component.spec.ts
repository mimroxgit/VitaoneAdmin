import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentgatewaylistloaderComponent } from './paymentgatewaylistloader.component';

describe('PaymentgatewaylistloaderComponent', () => {
  let component: PaymentgatewaylistloaderComponent;
  let fixture: ComponentFixture<PaymentgatewaylistloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentgatewaylistloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentgatewaylistloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
