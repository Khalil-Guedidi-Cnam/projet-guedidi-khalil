import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { CartState } from '../states/cart.state';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatLineModule} from "@angular/material/core";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ClearCart, RemoveFromCart} from "../actions/cart.actions";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatListModule,
    MatButtonModule,
    MatDialogActions,
    MatLineModule,
    MatDialogClose,
    AsyncPipe,
    MatDialogTitle,
    NgForOf,
    NgIf,
    MatIconModule
  ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css'
})
export class CartDialogComponent implements OnInit {

  @Select(CartState.cartProducts) products$!: Observable<Product[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Vous pouvez effectuer des actions supplémentaires lors de l'initialisation si nécessaire
  }

  removeFromCart(productId: number): void {
    this.store.dispatch(new RemoveFromCart(productId));
  }

  buyAndClearCart(): void {
    this.store.dispatch(new ClearCart());
  }

}
