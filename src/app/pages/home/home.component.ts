import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextComponent } from '../../shared/components/text/text.component';

import { IconGiftComponent } from "../../shared/assets/icons/icon-gift.component";
import { IconOnComponent } from '../../shared/assets/icons/icon-on.component';
import { IconStarComponent } from '../../shared/assets/icons/icon-star.component';
import { IconNotebookComponent } from '../../shared/assets/icons/icon-notebook.component';
// import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    // FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  vantagens = [
    {
      titulo: 'Conta e cartão gratuitos',
      descricao: 'Conta digital, sem custo fixo e sem tarifa de manutenção.',
      icon: IconGiftComponent,
    },
    {
      titulo: 'Saques sem custo',
      descricao: 'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.',
      icon: IconOnComponent,
    },
    {
      titulo: 'Cartão internacional',
      descricao: 'Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!',
      icon: IconStarComponent,
    },
    {
      titulo: 'Proteção digital',
      descricao: 'Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.',
      icon: IconNotebookComponent,
    },
  ];

  inputs = {
    class: 'text-white w-24 h-24',
  };
}
