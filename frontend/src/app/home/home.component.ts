import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Product} from "../models/product";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {AddToCart} from "../actions/cart.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products : Product[] = [];
  searchQuery: string = '';
  constructor(private apiService: ApiService, private router: Router, private store: Store) {}

  ngOnInit() {
    if (!this.apiService.isLoggedIn()) {
      this.router.navigate(['/login']);
      stop()
    }

    this.apiService.getProducts().subscribe(data => {
      this.products = data;
    });

    this.onSearchChange()

  }

  onSearchChange() {
    this.apiService.sendSearchQuery(this.searchQuery);
  }

  addToCart(product: Product): void {
    this.store.dispatch(new AddToCart(product));
  }
}
