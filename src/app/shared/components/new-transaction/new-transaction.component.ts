import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { TextComponent } from "../text/text.component";
import { InputComponent } from "../input/input.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss'],
  imports: [ButtonComponent, TextComponent, InputComponent, CommonModule, FormsModule]
})
export class NewTransactionComponent {
  transactionOptions: string[] = ['Receita', 'Despesa', 'Transferência'];
  valorTransacao: string = '';
}