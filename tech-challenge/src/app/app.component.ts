import { Component } from '@angular/core';

import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent
  ]
})
export class AppComponent {
  title = 'tech-challenge';
}
