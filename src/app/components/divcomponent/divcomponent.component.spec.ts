import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivcomponentComponent } from './divcomponent.component';

describe('DivcomponentComponent', () => {
  let component: DivcomponentComponent;
  let fixture: ComponentFixture<DivcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
