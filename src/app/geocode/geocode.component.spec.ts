import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeocodeComponent } from './geocode.component';

describe('GeocodeComponent', () => {
  let component: GeocodeComponent;
  let fixture: ComponentFixture<GeocodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeocodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
