import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from 'src/model/user';
import { BaseService } from '../base.service';

@Injectable()
export class AuthService extends BaseService {
  
  constructor(private http: HttpClient) { super(); }

  authUrl = this.baseUrl + '/users';

  signin(username: string, password: string) {
    return this.http.post<string>(
        this.authUrl + '/signin?username=' 
        + username + '&password=' 
        + password, null)
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
  
  saveTokenToLocalStorage(token: any): void {
    localStorage.setItem('auth_token', token.tokenValue);
  }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem('auth_token');
  }

}