import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductreviewCreateComponent } from './productreview-create.component';

describe('ProductreviewCreateComponent', () => {
  let component: ProductreviewCreateComponent;
  let fixture: ComponentFixture<ProductreviewCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductreviewCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductreviewCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
