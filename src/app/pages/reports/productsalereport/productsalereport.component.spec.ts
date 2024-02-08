import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsalereportComponent } from './productsalereport.component';

describe('ProductsalereportComponent', () => {
  let component: ProductsalereportComponent;
  let fixture: ComponentFixture<ProductsalereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsalereportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsalereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
