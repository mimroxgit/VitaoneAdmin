import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemunitsCreateComponent } from './itemunits-create.component';

describe('ItemunitsCreateComponent', () => {
  let component: ItemunitsCreateComponent;
  let fixture: ComponentFixture<ItemunitsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemunitsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemunitsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
