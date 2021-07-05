import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamestatslistComponent } from './gamestatslist.component';

describe('GamestatslistComponent', () => {
  let component: GamestatslistComponent;
  let fixture: ComponentFixture<GamestatslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamestatslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamestatslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
