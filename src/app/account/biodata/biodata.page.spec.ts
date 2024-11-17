import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiodataPage } from './biodata.page';

describe('BiodataPage', () => {
  let component: BiodataPage;
  let fixture: ComponentFixture<BiodataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiodataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
