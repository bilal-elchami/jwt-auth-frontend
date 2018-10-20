import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Observable } from 'rxjs';

// https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
    constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken = this.auth.getTokenFromLocalStorage();
    if (authToken && !request.headers.get('Authenticating')) {
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${authToken}`
            }
          });
    }
    return next.handle(request);
  }
}