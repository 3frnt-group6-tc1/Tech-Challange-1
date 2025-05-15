import { Component } from '@angular/core';

import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';

import { AppTitleComponent } from './shared/typography/app-title.component';
import { AppTitleRegularComponent } from './shared/typography/app-title-regular.component';
import { AppSubtitleComponent } from './shared/typography/app-subtitle.component';
import { AppTextRegularComponent } from './shared/typography/app-text-regular.component';
import { AppTextRegularGrayComponent } from './shared/typography/app-text-regular-gray.component';
import { AppTextRegularGray14Component } from './shared/typography/app-text-regular-gray-14.component';
import { AppTextBoldComponent } from './shared/typography/app-text-bold.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,

    AppTitleComponent,
    AppTitleRegularComponent,
    AppSubtitleComponent,
    AppTextRegularComponent,
    AppTextRegularGrayComponent,
    AppTextRegularGray14Component,
    AppTextBoldComponent
  ]
})
export class AppComponent {
  title = 'tech-challenge';
}
