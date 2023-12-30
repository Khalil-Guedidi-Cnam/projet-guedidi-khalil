import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(credentials: { password: string | null; login: string | null }) {
    return this.http.post(environment.backend.login, credentials);
  }
}
