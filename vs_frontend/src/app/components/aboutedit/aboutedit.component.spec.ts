import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbouteditComponent } from './aboutedit.component';

describe('AbouteditComponent', () => {
  let component: AbouteditComponent;
  let fixture: ComponentFixture<AbouteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbouteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbouteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
