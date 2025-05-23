import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconWhatsappComponent } from './icon-whatsapp.component';

describe('IconWhatsappComponent', () => {
  let component: IconWhatsappComponent;
  let fixture: ComponentFixture<IconWhatsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconWhatsappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
