import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryblockComponent } from './categoryblock.component';

describe('CategoryblockComponent', () => {
  let component: CategoryblockComponent;
  let fixture: ComponentFixture<CategoryblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryblockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
