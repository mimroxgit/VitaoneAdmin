import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsdetailloaderComponent } from './itemsdetailloader.component';

describe('ItemsdetailloaderComponent', () => {
  let component: ItemsdetailloaderComponent;
  let fixture: ComponentFixture<ItemsdetailloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsdetailloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsdetailloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
