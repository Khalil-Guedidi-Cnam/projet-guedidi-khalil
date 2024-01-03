import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, NgIf, MatCardModule, MatInputModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
  }
}
