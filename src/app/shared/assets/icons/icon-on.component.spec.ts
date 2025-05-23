import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconOnComponent } from './icon-on.component';

describe('IconOnComponent', () => {
  let component: IconOnComponent;
  let fixture: ComponentFixture<IconOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconOnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
