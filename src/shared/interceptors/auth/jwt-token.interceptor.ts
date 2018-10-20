import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getTokenFromLocalStorage();
    if (authToken && !request.headers.get('Authenticating')) {
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${authToken}`
            }
          });
    }
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // console.log("All looks good");
          // http response status code
          // console.log(event.status);
        }
      }, error => {
        // switch (error.status) {
        //   case 403:
        //     this.router.navigate(['/signin']);
        //     break;
        //   default:
        //     break;
        // }
        // http response status code
        // console.log("----response----");
        // console.error("status code:");
        // console.error(error.status);
        // console.error(error.message);
        // console.log("--- end of response---");
      })
    );
  }
}
