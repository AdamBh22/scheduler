import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LnavbarComponent } from './lnavbar.component';

describe('LnavbarComponent', () => {
  let component: LnavbarComponent;
  let fixture: ComponentFixture<LnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LnavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
