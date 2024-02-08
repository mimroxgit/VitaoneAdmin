import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountbuttoncomponentComponent } from './accountbuttoncomponent.component';

describe('AccountbuttoncomponentComponent', () => {
  let component: AccountbuttoncomponentComponent;
  let fixture: ComponentFixture<AccountbuttoncomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountbuttoncomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountbuttoncomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
