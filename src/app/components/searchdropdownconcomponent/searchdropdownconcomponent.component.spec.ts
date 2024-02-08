import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdropdownconcomponentComponent } from './searchdropdownconcomponent.component';

describe('SearchdropdownconcomponentComponent', () => {
  let component: SearchdropdownconcomponentComponent;
  let fixture: ComponentFixture<SearchdropdownconcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchdropdownconcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchdropdownconcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
