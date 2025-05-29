import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAccountCircleComponent } from './icon-account-circle.component';

describe('IconAccountCircleComponent', () => {
  let component: IconAccountCircleComponent;
  let fixture: ComponentFixture<IconAccountCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconAccountCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconAccountCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
