import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bill-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor (private authService: AuthService, private fb: FormBuilder, private router: Router) { }

    badCredentials = false;

    currentYear = (new Date()).getFullYear();
    loginForm: FormGroup;

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/profile']);
        }
        this.loginForm = this.fb.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.signin(this.loginForm.value.username, this.loginForm.value.password)
                .subscribe(
                    res => this.router.navigate(['/profile']),
                    err => this.badCredentials = true
                );
        }
    }

}
