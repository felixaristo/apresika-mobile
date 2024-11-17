import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlipgajiPage } from './slipgaji.page';

describe('SlipgajiPage', () => {
  let component: SlipgajiPage;
  let fixture: ComponentFixture<SlipgajiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipgajiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
