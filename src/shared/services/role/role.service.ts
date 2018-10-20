import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Role } from 'src/model/role';
import { BaseService } from '../base.service';

@Injectable()
export class RoleService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  roleUrl = this.baseUrl + '/roles';

  getRoles() {
    return this.http.get<Role[]>(
        this.roleUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

}
