import { Component, Input, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterModule, NgClass, NgComponentOutlet],
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {
  @Input() label!: string;
  @Input() route!: string;
  @Input() active: boolean = false;
  @Input() iconComponent!: Type<any>;
}
