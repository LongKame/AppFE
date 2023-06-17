import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellAppComponent } from './cell-app.component';

describe('CellAppComponent', () => {
  let component: CellAppComponent;
  let fixture: ComponentFixture<CellAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
