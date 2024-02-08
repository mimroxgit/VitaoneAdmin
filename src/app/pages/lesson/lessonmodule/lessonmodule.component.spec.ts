import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonmoduleComponent } from './lessonmodule.component';

describe('LessonmoduleComponent', () => {
  let component: LessonmoduleComponent;
  let fixture: ComponentFixture<LessonmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonmoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
