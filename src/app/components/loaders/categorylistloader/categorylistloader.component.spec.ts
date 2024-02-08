import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorylistloaderComponent } from './categorylistloader.component';

describe('CategorylistloaderComponent', () => {
  let component: CategorylistloaderComponent;
  let fixture: ComponentFixture<CategorylistloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorylistloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorylistloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
