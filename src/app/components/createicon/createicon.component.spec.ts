import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateiconComponent } from './createicon.component';

describe('CreateiconComponent', () => {
  let component: CreateiconComponent;
  let fixture: ComponentFixture<CreateiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateiconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
