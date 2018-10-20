import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from 'src/model/user';
import { BaseService } from '../base.service';

@Injectable()
export class UserService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  roleUrl = this.baseUrl + '/users';

  getUsers() {
    return this.http.get<User[]>(
      this.roleUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getCurrentUser() {
    return this.http.get<User>(
      this.roleUrl + '/me', this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

}
