import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomparentsliderComponent } from './customparentslider.component';

describe('CustomparentsliderComponent', () => {
  let component: CustomparentsliderComponent;
  let fixture: ComponentFixture<CustomparentsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomparentsliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomparentsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
