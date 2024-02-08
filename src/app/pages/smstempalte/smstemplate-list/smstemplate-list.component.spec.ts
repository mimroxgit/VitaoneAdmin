import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmstemplateListComponent } from './smstemplate-list.component';

describe('SmstemplateListComponent', () => {
  let component: SmstemplateListComponent;
  let fixture: ComponentFixture<SmstemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmstemplateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmstemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
