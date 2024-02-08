import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityloaderComponent } from './cityloader.component';

describe('CityloaderComponent', () => {
  let component: CityloaderComponent;
  let fixture: ComponentFixture<CityloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
