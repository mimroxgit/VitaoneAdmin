import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemunitsListComponent } from './itemunits-list.component';

describe('ItemunitsListComponent', () => {
  let component: ItemunitsListComponent;
  let fixture: ComponentFixture<ItemunitsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemunitsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemunitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
