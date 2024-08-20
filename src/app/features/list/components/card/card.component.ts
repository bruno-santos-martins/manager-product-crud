import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  product = input.required<Product>();

  productTitle = computed(() => this.product().title);

  @Output() edit = new EventEmitter();
  @Output() onDelete = new EventEmitter();


}
