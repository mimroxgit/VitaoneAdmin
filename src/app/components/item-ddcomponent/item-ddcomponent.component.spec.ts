import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDDcomponentComponent } from './item-ddcomponent.component';

describe('ItemDDcomponentComponent', () => {
  let component: ItemDDcomponentComponent;
  let fixture: ComponentFixture<ItemDDcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDDcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDDcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
