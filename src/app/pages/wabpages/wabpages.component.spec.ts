import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WabpagesComponent } from './wabpages.component';

describe('WabpagesComponent', () => {
  let component: WabpagesComponent;
  let fixture: ComponentFixture<WabpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WabpagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WabpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
