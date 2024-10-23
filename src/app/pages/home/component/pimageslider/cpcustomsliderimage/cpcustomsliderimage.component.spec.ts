import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpcustomsliderimageComponent } from './cpcustomsliderimage.component';

describe('CpcustomsliderimageComponent', () => {
  let component: CpcustomsliderimageComponent;
  let fixture: ComponentFixture<CpcustomsliderimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpcustomsliderimageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpcustomsliderimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
