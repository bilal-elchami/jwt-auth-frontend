import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { ErrorCode } from 'src/shared/consts/error.codes';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      let errorCode = ErrorCode.NotLoggedIn;
      if (this.auth.isSessionExpired()) {
        errorCode = ErrorCode.SessionExpired;
      }
      this.router.navigate(['signin', errorCode]);
      return false;
    }
    return true;
  }

}
