import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutdetailComponent } from './payoutdetail.component';

describe('PayoutdetailComponent', () => {
  let component: PayoutdetailComponent;
  let fixture: ComponentFixture<PayoutdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayoutdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
