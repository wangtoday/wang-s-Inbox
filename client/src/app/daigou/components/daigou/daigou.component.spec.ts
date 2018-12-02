import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaigouComponent } from './daigou.component';

describe('DaigouComponent', () => {
  let component: DaigouComponent;
  let fixture: ComponentFixture<DaigouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaigouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaigouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
