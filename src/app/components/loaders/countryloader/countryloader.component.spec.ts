import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryloaderComponent } from './countryloader.component';

describe('CountryloaderComponent', () => {
  let component: CountryloaderComponent;
  let fixture: ComponentFixture<CountryloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
