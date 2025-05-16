import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTextRegularComponent } from './app-text-regular.component';

describe('AppTextRegularComponent', () => {
  let component: AppTextRegularComponent;
  let fixture: ComponentFixture<AppTextRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTextRegularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTextRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
