import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, catchError } from 'rxjs/operators';

import { BaseService } from '../base.service';
import { User } from 'src/model/user';

@Injectable()
export class AuthService extends BaseService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { super(); }

  authUrl = this.baseUrl + '/users';

  signin(username: string, password: string) {
    const httpAuthHeaderOptions = {
        headers: new HttpHeaders({
          'Authenticating' : 'true'
        })
      };
    return this.http.post<string>(
        this.authUrl + '/signin?username='
        + username + '&password='
        + password, null, httpAuthHeaderOptions)
    .pipe(
      tap(this.saveTokenToLocalStorage),
      catchError(this.handleError)
    );
  }

  signup(user: User) {
    return this.http.post<string>(
      this.authUrl + '/signup', user)
    .pipe(
      tap(this.saveTokenToLocalStorage),
      catchError(this.handleError)
    );
  }

  signout(): void {
    this.deleteTokenFromLocalStorage();
  }

  saveTokenToLocalStorage(token: any): void {
    localStorage.setItem('auth_token', token.tokenValue);
  }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem('auth_token');
  }

  deleteTokenFromLocalStorage(): void {
    localStorage.removeItem('auth_token');
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getTokenFromLocalStorage());
  }

}
