import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconExitComponent } from './icon-exit.component';

describe('IconExitComponent', () => {
  let component: IconExitComponent;
  let fixture: ComponentFixture<IconExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconExitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
