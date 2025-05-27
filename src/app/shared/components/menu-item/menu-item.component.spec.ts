import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuItemComponent } from './menu-item.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'mock-icon',
  template: '<div>Mock Icon</div>',
  standalone: true
})
class MockIconComponent {}

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemComponent],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;

    component.label = 'Test';
    component.route = '/test';
    component.iconComponent = MockIconComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});