import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicsComponent } from './olympics.component';

describe('OlympicsComponent', () => {
  let component: OlympicsComponent;
  let fixture: ComponentFixture<OlympicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
