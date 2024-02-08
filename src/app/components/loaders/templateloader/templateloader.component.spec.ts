import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateloaderComponent } from './templateloader.component';

describe('TemplateloaderComponent', () => {
  let component: TemplateloaderComponent;
  let fixture: ComponentFixture<TemplateloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
