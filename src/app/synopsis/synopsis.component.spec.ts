import { ComponentFixture, TestBed } from '@angular/core/testing';

import { synopsisComponent } from './synopsis.component';

describe('synopsisComponent', () => {
  let component: synopsisComponent;
  let fixture: ComponentFixture<synopsisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ synopsisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(synopsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
