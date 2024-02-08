import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrdGrpdetailloaderComponent } from './prd-grpdetailloader.component';

describe('PrdGrpdetailloaderComponent', () => {
  let component: PrdGrpdetailloaderComponent;
  let fixture: ComponentFixture<PrdGrpdetailloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrdGrpdetailloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrdGrpdetailloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
