import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdsalreportloaderComponent } from './prdsalreportloader.component';

describe('PrdsalreportloaderComponent', () => {
  let component: PrdsalreportloaderComponent;
  let fixture: ComponentFixture<PrdsalreportloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdsalreportloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrdsalreportloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
