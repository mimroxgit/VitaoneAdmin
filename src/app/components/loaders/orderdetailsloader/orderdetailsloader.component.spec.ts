import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdetailsloaderComponent } from './orderdetailsloader.component';

describe('OrderdetailsloaderComponent', () => {
  let component: OrderdetailsloaderComponent;
  let fixture: ComponentFixture<OrderdetailsloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderdetailsloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderdetailsloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
