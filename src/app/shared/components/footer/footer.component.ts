import { Component } from '@angular/core';
import { TextComponent } from '../text/text.component';
import { apiConfig, systemConfig } from '../../../app.config';

@Component({
  selector: 'app-footer',
  imports: [TextComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  company: string = systemConfig.company;
  version: string = systemConfig.version;
  year: number = systemConfig.year;
}
