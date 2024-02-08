import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductreviewloadercomponentsComponent } from './productreviewloadercomponents.component';

describe('ProductreviewloadercomponentsComponent', () => {
  let component: ProductreviewloadercomponentsComponent;
  let fixture: ComponentFixture<ProductreviewloadercomponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductreviewloadercomponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductreviewloadercomponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
