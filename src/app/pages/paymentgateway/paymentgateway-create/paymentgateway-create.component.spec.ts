import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentgatewayCreateComponent } from './paymentgateway-create.component';

describe('PaymentgatewayCreateComponent', () => {
  let component: PaymentgatewayCreateComponent;
  let fixture: ComponentFixture<PaymentgatewayCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentgatewayCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentgatewayCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
