import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateloaderComponent } from './stateloader.component';

describe('StateloaderComponent', () => {
  let component: StateloaderComponent;
  let fixture: ComponentFixture<StateloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
