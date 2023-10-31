import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPopupComponent } from './open-popup.component';

describe('OpenPopupComponent', () => {
  let component: OpenPopupComponent;
  let fixture: ComponentFixture<OpenPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
