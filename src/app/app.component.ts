import { Component } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  _isLoggedIn = false;

  get isLoggedIn(): any {
    return this._isLoggedIn = this.authService.isAuthenticated();
  }

  constructor(private authService: AuthService, private router: Router) { }

  signout(): void {
    this.authService.signout();
    this.router.navigate(['/home']);
  }

}
