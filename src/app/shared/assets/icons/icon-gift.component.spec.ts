import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconGiftComponent } from './icon-gift.component';

describe('IconGiftComponent', () => {
  let component: IconGiftComponent;
  let fixture: ComponentFixture<IconGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconGiftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
