import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraGrouplistloaderComponent } from './pra-grouplistloader.component';

describe('PraGrouplistloaderComponent', () => {
  let component: PraGrouplistloaderComponent;
  let fixture: ComponentFixture<PraGrouplistloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraGrouplistloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PraGrouplistloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
