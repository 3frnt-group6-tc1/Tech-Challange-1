import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconArrowPencilComponent } from './icon-arrow-pencil.component';

describe('IconArrowPencilComponent', () => {
  let component: IconArrowPencilComponent;
  let fixture: ComponentFixture<IconArrowPencilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconArrowPencilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconArrowPencilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
