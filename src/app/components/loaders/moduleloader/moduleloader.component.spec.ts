import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleloaderComponent } from './moduleloader.component';

describe('ModuleloaderComponent', () => {
  let component: ModuleloaderComponent;
  let fixture: ComponentFixture<ModuleloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
