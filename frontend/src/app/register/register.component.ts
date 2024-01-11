import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {ApiService} from "../api/api.service";
import {User} from "../models/user";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, NgIf, MatCardModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      sexe: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', [Validators.required]],
      codepostal: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
    }, { validator: this.matchPassword });
  }

  matchPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const utilisateur : User = {
      nom: this.registerForm.get('nom')?.value,
      prenom: this.registerForm.get('prenom')?.value,
      email: this.registerForm.get('email')?.value,
      telephone: this.registerForm.get('telephone')?.value,
      adresse: this.registerForm.get('adresse')?.value,
      codepostal: this.registerForm.get('codepostal')?.value,
      ville: this.registerForm.get('ville')?.value,
      sexe: this.registerForm.get('sexe')?.value,
      login: this.registerForm.get('login')?.value,
      password: this.registerForm.get('password')?.value
    }

    this.apiService.register(utilisateur).subscribe({
      next: () => {
        this.router.navigate(['/login'])
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
