import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(credentials: { password: string | null; login: string | null }) {
    return this.http.post<any>(environment.backend.login, credentials, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          const jwt = response.headers.get('Authorization');
          if (jwt) {
            sessionStorage.setItem('jwt', jwt);
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error.message || 'Une erreur inconnue est survenue.';
    return throwError(() => new Error(errorMessage));
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('jwt');
  }

  getJwtToken(): string | null {
    return sessionStorage.getItem('jwt');
  }

  logout(): void {
    sessionStorage.removeItem('jwt');
  }

  getProducts(): Observable<any> {
    const jwt = sessionStorage.getItem('jwt');
    console.log(jwt)
    const headers = new HttpHeaders({'Authorization': `${jwt}`});
    return this.http.get(environment.backend.getProducts, { headers });
  }
}
