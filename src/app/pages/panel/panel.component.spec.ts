import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PainelComponent } from './panel.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PainelComponent', () => {
  let component: PainelComponent;
  let fixture: ComponentFixture<PainelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});