import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryloaderComponent } from './inventoryloader.component';

describe('InventoryloaderComponent', () => {
  let component: InventoryloaderComponent;
  let fixture: ComponentFixture<InventoryloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
