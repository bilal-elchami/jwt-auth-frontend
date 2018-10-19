import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
    constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken = this.auth.getTokenFromLocalStorage();
    if (authToken) {
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.auth.getTokenFromLocalStorage()}`
            }
          });
    }
    return next.handle(request);
  }
}