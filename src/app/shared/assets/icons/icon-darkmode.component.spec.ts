import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDarkmodeComponent } from './icon-darkmode.component';

describe('IconDarkmodeComponent', () => {
  let component: IconDarkmodeComponent;
  let fixture: ComponentFixture<IconDarkmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDarkmodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDarkmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
