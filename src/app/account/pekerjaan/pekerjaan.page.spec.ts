import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PekerjaanPage } from './pekerjaan.page';

describe('PekerjaanPage', () => {
  let component: PekerjaanPage;
  let fixture: ComponentFixture<PekerjaanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PekerjaanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
