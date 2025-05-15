import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTextRegularGray14Component } from './app-text-regular-gray-14.component';

describe('AppTextRegularGray14Component', () => {
  let component: AppTextRegularGray14Component;
  let fixture: ComponentFixture<AppTextRegularGray14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTextRegularGray14Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTextRegularGray14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
