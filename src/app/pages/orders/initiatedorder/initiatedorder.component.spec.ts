import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiatedorderComponent } from './initiatedorder.component';

describe('InitiatedorderComponent', () => {
  let component: InitiatedorderComponent;
  let fixture: ComponentFixture<InitiatedorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiatedorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiatedorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
