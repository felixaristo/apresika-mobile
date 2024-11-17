import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CutiPage } from './cuti.page';

describe('CutiPage', () => {
  let component: CutiPage;
  let fixture: ComponentFixture<CutiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CutiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
