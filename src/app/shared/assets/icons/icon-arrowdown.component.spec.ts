import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconArrowdownComponent } from './icon-arrowdown.component';

describe('IconArrowdownComponent', () => {
  let component: IconArrowdownComponent;
  let fixture: ComponentFixture<IconArrowdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconArrowdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconArrowdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
