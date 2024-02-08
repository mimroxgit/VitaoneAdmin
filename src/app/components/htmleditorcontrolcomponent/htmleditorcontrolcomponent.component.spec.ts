import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmleditorcontrolcomponentComponent } from './htmleditorcontrolcomponent.component';

describe('HtmleditorcontrolcomponentComponent', () => {
  let component: HtmleditorcontrolcomponentComponent;
  let fixture: ComponentFixture<HtmleditorcontrolcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmleditorcontrolcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmleditorcontrolcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
