import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSubtitleComponent } from './app-subtitle.component';

describe('AppSubtitleComponent', () => {
  let component: AppSubtitleComponent;
  let fixture: ComponentFixture<AppSubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSubtitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
