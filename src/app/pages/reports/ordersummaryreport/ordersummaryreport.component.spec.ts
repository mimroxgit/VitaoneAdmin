import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersummaryreportComponent } from './ordersummaryreport.component';

describe('OrdersummaryreportComponent', () => {
  let component: OrdersummaryreportComponent;
  let fixture: ComponentFixture<OrdersummaryreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersummaryreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersummaryreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
