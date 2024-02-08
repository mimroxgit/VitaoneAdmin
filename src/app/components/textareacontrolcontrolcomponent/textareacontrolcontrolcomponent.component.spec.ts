import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareacontrolcontrolcomponentComponent } from './textareacontrolcontrolcomponent.component';

describe('TextareacontrolcontrolcomponentComponent', () => {
  let component: TextareacontrolcontrolcomponentComponent;
  let fixture: ComponentFixture<TextareacontrolcontrolcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareacontrolcontrolcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareacontrolcontrolcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
