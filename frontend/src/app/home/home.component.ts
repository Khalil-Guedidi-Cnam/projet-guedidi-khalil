import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {Product} from "../models/product";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

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
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products : Product[] = [];
  searchQuery: string = '';
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    if (!this.apiService.isLoggedIn()) {
      this.router.navigate(['/login']);
      stop()
    }

    this.apiService.getProducts().subscribe(data => {
      this.products = data;
    });

    this.onSearchChange();

  }

  onSearchChange() {
    this.apiService.sendSearchQuery(this.searchQuery);
  }
}
