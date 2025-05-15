import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDollarComponent } from './icon-dollar.component';

describe('IconDollarComponent', () => {
  let component: IconDollarComponent;
  let fixture: ComponentFixture<IconDollarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDollarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDollarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
