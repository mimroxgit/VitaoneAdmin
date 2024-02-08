import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionloadercomponentsComponent } from './transactionloadercomponents.component';

describe('TransactionloadercomponentsComponent', () => {
  let component: TransactionloadercomponentsComponent;
  let fixture: ComponentFixture<TransactionloadercomponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionloadercomponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionloadercomponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
