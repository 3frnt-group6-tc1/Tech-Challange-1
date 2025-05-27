import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconHamburgerComponent } from './icon-hamburger.component';

describe('IconHamburgerComponent', () => {
  let component: IconHamburgerComponent;
  let fixture: ComponentFixture<IconHamburgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconHamburgerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconHamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
