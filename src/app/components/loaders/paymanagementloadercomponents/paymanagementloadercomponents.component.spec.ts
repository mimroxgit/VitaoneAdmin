import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymanagementloadercomponentsComponent } from './paymanagementloadercomponents.component';

describe('PaymanagementloadercomponentsComponent', () => {
  let component: PaymanagementloadercomponentsComponent;
  let fixture: ComponentFixture<PaymanagementloadercomponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymanagementloadercomponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymanagementloadercomponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
