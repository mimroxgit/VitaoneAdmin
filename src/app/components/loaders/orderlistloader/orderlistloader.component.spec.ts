import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistloaderComponent } from './orderlistloader.component';

describe('OrderlistloaderComponent', () => {
  let component: OrderlistloaderComponent;
  let fixture: ComponentFixture<OrderlistloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderlistloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderlistloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
