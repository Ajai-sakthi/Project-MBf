import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Custom2carouselComponent } from './custom2carousel.component';

describe('Custom2carouselComponent', () => {
  let component: Custom2carouselComponent;
  let fixture: ComponentFixture<Custom2carouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Custom2carouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Custom2carouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
