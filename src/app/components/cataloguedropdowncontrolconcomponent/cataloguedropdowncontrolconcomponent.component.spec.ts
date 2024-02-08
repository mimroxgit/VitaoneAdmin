import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguedropdowncontrolconcomponentComponent } from './cataloguedropdowncontrolconcomponent.component';

describe('CataloguedropdowncontrolconcomponentComponent', () => {
  let component: CataloguedropdowncontrolconcomponentComponent;
  let fixture: ComponentFixture<CataloguedropdowncontrolconcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CataloguedropdowncontrolconcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CataloguedropdowncontrolconcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
