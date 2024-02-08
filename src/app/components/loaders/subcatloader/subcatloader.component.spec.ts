import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcatloaderComponent } from './subcatloader.component';

describe('SubcatloaderComponent', () => {
  let component: SubcatloaderComponent;
  let fixture: ComponentFixture<SubcatloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcatloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcatloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
