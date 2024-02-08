import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemslistloaderComponent } from './itemslistloader.component';

describe('ItemslistloaderComponent', () => {
  let component: ItemslistloaderComponent;
  let fixture: ComponentFixture<ItemslistloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemslistloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemslistloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
