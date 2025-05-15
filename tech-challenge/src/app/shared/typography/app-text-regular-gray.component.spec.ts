import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTextRegularGrayComponent } from './app-text-regular-gray.component';

describe('AppTextRegularGrayComponent', () => {
  let component: AppTextRegularGrayComponent;
  let fixture: ComponentFixture<AppTextRegularGrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTextRegularGrayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTextRegularGrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
