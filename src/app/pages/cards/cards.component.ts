import { Component } from '@angular/core';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { UnderConstructionComponent } from '../../shared/components/under-construction/under-construction.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [LayoutComponent, UnderConstructionComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {}
