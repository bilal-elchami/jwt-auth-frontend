import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bill-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor (private authService: AuthService, private router: Router) { }

    username: string;
    password: string;

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/profile'])
        }
    }
    
    onSubmit() {
        this.authService.signin(this.username, this.password)
        .subscribe(
            res => this.router.navigate(['/profile']),
            err => console.error(err)
        );
    }

}
