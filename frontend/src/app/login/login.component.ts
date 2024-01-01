import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import {NgIf} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ApiService} from "../api/api.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, RouterOutlet, MatCardModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = new FormControl('', [Validators.required]);
  password = new FormControl('', Validators.required);
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    if (this.login.invalid || this.password.invalid) {
      return;
    }

    this.apiService.login({ login: this.login.value, password: this.password.value }).subscribe({
      next: () => {
        this.router.navigate([''])
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
