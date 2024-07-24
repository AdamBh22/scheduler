import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDependencyModalComponent } from './new-dependency-modal.component';

describe('NewDependencyModalComponent', () => {
  let component: NewDependencyModalComponent;
  let fixture: ComponentFixture<NewDependencyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDependencyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDependencyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
