import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTitleRegularComponent } from './app-title-regular.component';

describe('AppTitleRegularComponent', () => {
  let component: AppTitleRegularComponent;
  let fixture: ComponentFixture<AppTitleRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTitleRegularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTitleRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
