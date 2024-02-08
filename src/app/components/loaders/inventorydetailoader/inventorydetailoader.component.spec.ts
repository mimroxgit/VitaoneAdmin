import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorydetailoaderComponent } from './inventorydetailoader.component';

describe('InventorydetailoaderComponent', () => {
  let component: InventorydetailoaderComponent;
  let fixture: ComponentFixture<InventorydetailoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorydetailoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorydetailoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
