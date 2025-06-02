import { Component } from '@angular/core';
import { AsideComponent } from '../aside/aside.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [AsideComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {}
