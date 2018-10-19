import { Component } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bill-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor (private authService: AuthService, private router: Router) { }

    username: string;
    password: string;

    signin() {
        this.authService.signin(this.username, this.password)
        .subscribe(
            res => this.router.navigate(['/users']),
            err => console.error(err)
        );
    }

}
