// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// import { HeaderComponent } from './shared/components/header/header.component'

// import { ButtonComponent } from './shared/components/button/button.component';
// import { InputComponent } from './shared/components/input/input.component';
// import { MenuItemComponent } from './shared/components/menu-item/menu-item.component';
// import { StatementComponent } from './shared/components/statement/statement.component'

// import { TextComponent } from './shared/components/text/text.component'

// import { IconHomeComponent } from './shared/assets/icons/icon-home.component';
// import { IconDollarComponent } from './shared/assets/icons/icon-dollar.component';
// import { IconListComponent } from './shared/assets/icons/icon-list.component';
// import { IconCardComponent } from './shared/assets/icons/icon-card.component';
// import { IconSettingsComponent } from './shared/assets/icons/icon-settings.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss',
//   standalone: true,
//   imports: [
//     HeaderComponent,
//     ButtonComponent,
//     InputComponent,
//     MenuItemComponent,
//     StatementComponent,
//     TextComponent,
//     DashboardComponent,
//   ]
// })
// export class AppComponent {
//   title: string = 'tech-challenge';
//   currentRoute: string = '/inicio';

//   iconHome: any = IconHomeComponent;
//   iconDollar: any = IconDollarComponent;
//   iconList: any = IconListComponent;
//   iconCard: any = IconCardComponent;
//   iconSettings: any = IconSettingsComponent;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     this.currentRoute = this.router.url;
//     this.router.events.subscribe(() => {
//       this.currentRoute = this.router.url;
//     });
//   }
// }


import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TechChallenge - FIAP';
}