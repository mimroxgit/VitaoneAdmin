import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosesEditComponent } from './doses-edit.component';

describe('DosesEditComponent', () => {
  let component: DosesEditComponent;
  let fixture: ComponentFixture<DosesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DosesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
