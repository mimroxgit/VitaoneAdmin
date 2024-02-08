import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentgatewayEditComponent } from './paymentgateway-edit.component';

describe('PaymentgatewayEditComponent', () => {
  let component: PaymentgatewayEditComponent;
  let fixture: ComponentFixture<PaymentgatewayEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentgatewayEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentgatewayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
