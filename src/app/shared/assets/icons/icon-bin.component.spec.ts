import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBinComponent } from './icon-bin.component';

describe('IconBinComponent', () => {
  let component: IconBinComponent;
  let fixture: ComponentFixture<IconBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconBinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
