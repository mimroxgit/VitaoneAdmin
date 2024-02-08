import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierlistloaderComponent } from './courierlistloader.component';

describe('CourierlistloaderComponent', () => {
  let component: CourierlistloaderComponent;
  let fixture: ComponentFixture<CourierlistloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierlistloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierlistloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
