import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DinasPage } from './dinas.page';

describe('DinasPage', () => {
  let component: DinasPage;
  let fixture: ComponentFixture<DinasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
