import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivplistComponent } from './divplist.component';

describe('DivplistComponent', () => {
  let component: DivplistComponent;
  let fixture: ComponentFixture<DivplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivplistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
