import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmstemplateCreateComponent } from './smstemplate-create.component';

describe('SmstemplateCreateComponent', () => {
  let component: SmstemplateCreateComponent;
  let fixture: ComponentFixture<SmstemplateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmstemplateCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmstemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
