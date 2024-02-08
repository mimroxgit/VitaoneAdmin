import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemunitsEditComponent } from './itemunits-edit.component';

describe('ItemunitsEditComponent', () => {
  let component: ItemunitsEditComponent;
  let fixture: ComponentFixture<ItemunitsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemunitsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemunitsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
