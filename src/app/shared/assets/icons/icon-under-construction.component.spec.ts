import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconUnderConstructionComponent } from './icon-under-construction.component';

describe('IconUnderConstructionComponent', () => {
  let component: IconUnderConstructionComponent;
  let fixture: ComponentFixture<IconUnderConstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconUnderConstructionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconUnderConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
