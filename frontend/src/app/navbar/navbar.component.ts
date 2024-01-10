import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Select, Store} from "@ngxs/store";
// import {CartState} from "../states/cart.state";
import {MatDialog} from "@angular/material/dialog";
import {CartDialogComponent} from "../cart-dialog/cart-dialog.component";
import {MatBadgeModule} from "@angular/material/badge";
import {CartState} from "../states/cart.state";
import {map, Observable} from "rxjs";
import {Product} from "../models/product";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Select(CartState.cartProducts) cartProducts$!: Observable<Product[]>;
  cartCount$: Observable<number>;

  constructor(public dialog: MatDialog) {
    this.cartCount$ = this.cartProducts$.pipe(
      map(products => products.length)
    );
  }
  openCartDialog(): void {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialogue du panier a été fermé');
    });
  }
}
