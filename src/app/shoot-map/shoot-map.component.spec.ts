import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootMapComponent } from './shoot-map.component';

describe('GridComponent', () => {
  let component: ShootMapComponent;
  let fixture: ComponentFixture<ShootMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShootMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShootMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
