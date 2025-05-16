import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconArrowDownLeftComponent } from './icon-arrow-down-left.component';

describe('IconArrowDownLeftComponent', () => {
  let component: IconArrowDownLeftComponent;
  let fixture: ComponentFixture<IconArrowDownLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconArrowDownLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconArrowDownLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
