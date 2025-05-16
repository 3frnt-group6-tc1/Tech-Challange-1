import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTextBoldComponent } from './app-text-bold.component';

describe('AppTextBoldComponent', () => {
  let component: AppTextBoldComponent;
  let fixture: ComponentFixture<AppTextBoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTextBoldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTextBoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
