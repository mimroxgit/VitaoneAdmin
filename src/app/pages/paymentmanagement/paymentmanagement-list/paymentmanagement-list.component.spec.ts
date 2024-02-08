import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmanagementListComponent } from './paymentmanagement-list.component';

describe('PaymentmanagementListComponent', () => {
  let component: PaymentmanagementListComponent;
  let fixture: ComponentFixture<PaymentmanagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentmanagementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentmanagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
