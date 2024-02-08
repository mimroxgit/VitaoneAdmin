import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductreviewEditComponent } from './productreview-edit.component';

describe('ProductreviewEditComponent', () => {
  let component: ProductreviewEditComponent;
  let fixture: ComponentFixture<ProductreviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductreviewEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductreviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
