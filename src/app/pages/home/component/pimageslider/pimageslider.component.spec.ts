import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PimagesliderComponent } from './pimageslider.component';

describe('PimagesliderComponent', () => {
  let component: PimagesliderComponent;
  let fixture: ComponentFixture<PimagesliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PimagesliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PimagesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
