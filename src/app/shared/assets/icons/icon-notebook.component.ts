import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-notebook',
  imports: [
    CommonModule
  ],
  templateUrl: './icon-notebook.component.html',
  styleUrl: './icon-notebook.component.scss'
})
export class IconNotebookComponent {
  @Input() class = '';
}
