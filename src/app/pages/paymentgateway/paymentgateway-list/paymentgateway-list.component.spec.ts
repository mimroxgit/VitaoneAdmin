import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentgatewayListComponent } from './paymentgateway-list.component';

describe('PaymentgatewayListComponent', () => {
  let component: PaymentgatewayListComponent;
  let fixture: ComponentFixture<PaymentgatewayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentgatewayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentgatewayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
