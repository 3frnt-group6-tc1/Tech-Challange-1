import { Component } from '@angular/core';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { UnderConstructionComponent } from '../../shared/components/under-construction/under-construction.component';

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [LayoutComponent, UnderConstructionComponent],
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.scss',
})
export class ConfigurationsComponent {}
