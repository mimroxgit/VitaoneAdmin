import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmstemplateEditComponent } from './smstemplate-edit.component';

describe('SmstemplateEditComponent', () => {
  let component: SmstemplateEditComponent;
  let fixture: ComponentFixture<SmstemplateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmstemplateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmstemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
