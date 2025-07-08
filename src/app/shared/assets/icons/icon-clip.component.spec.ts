import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconClipComponent } from './icon-clip.component';

describe('IconClipComponent', () => {
  let component: IconClipComponent;
  let fixture: ComponentFixture<IconClipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconClipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
