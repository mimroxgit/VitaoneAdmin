import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosesCreateComponent } from './doses-create.component';

describe('DosesCreateComponent', () => {
  let component: DosesCreateComponent;
  let fixture: ComponentFixture<DosesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DosesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
