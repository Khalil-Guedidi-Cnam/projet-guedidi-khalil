import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormsModule} from '@angular/forms';
import {NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, RouterOutlet, MatCardModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  getEmailErrorMessage() {
    if (this.login.hasError('required')) {
      return 'Vous devez entrer une valeur.';
    }

    return this.login.hasError('email') ? 'Email non valide' : '';
  }

  onSubmit() {
    if (this.login.invalid || this.password.invalid) {
      return;
    }

    console.log({ login: this.login.value, password: this.password.value });
  }
}
