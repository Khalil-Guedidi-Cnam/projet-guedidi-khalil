import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private searchQuerySubject = new Subject<string>();
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

  signup(userInfo) {}

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

  sendSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  getProducts(): Observable<Product[]> {
    const jwt = sessionStorage.getItem('jwt');
    const headers = new HttpHeaders({'Authorization': `${jwt}`});

    return this.searchQuerySubject.asObservable().pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap(query => {
        let params = new HttpParams();
        if (query) {
          params = params.append('name', query);
        }
        return this.http.get<Product[]>(environment.backend.getProducts, { headers, params });
      })
    );
  }

}
