import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpSliderLigntboxComponent } from './cp-slider-ligntbox.component';

describe('CpSliderLigntboxComponent', () => {
  let component: CpSliderLigntboxComponent;
  let fixture: ComponentFixture<CpSliderLigntboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpSliderLigntboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpSliderLigntboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
