import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoriesCreateComponent } from './subcategories-create.component';

describe('SubcategoriesCreateComponent', () => {
  let component: SubcategoriesCreateComponent;
  let fixture: ComponentFixture<SubcategoriesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoriesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
