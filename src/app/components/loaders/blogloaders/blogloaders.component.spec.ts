import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogloadersComponent } from './blogloaders.component';

describe('BlogloadersComponent', () => {
  let component: BlogloadersComponent;
  let fixture: ComponentFixture<BlogloadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogloadersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogloadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
