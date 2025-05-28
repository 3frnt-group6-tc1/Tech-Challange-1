import { Component } from '@angular/core';
import { TextComponent } from '../text/text.component';
import { IconUnderConstructionComponent } from '../../assets/icons/icon-under-construction.component';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  imports: [IconUnderConstructionComponent, TextComponent],
  styleUrls: ['./under-construction.component.scss'],
})
export class UnderConstructionComponent {}
