import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorCode } from 'src/shared/consts/error.codes';

@Component({
  selector: 'bill-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor (
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute) { }

    showErrorAlert = false;

    currentYear = (new Date()).getFullYear();
    loginForm: FormGroup;

    errorCode: number = null;

    ErrorCode = ErrorCode;

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/profile']);
        }
        this.route.params.subscribe(params => {
            this.errorCode = +params['error_code'];
            if (this.errorCode) {
                this.showErrorAlert = true;
            }
        });
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
                    err => {
                        this.showErrorAlert = true;
                        this.errorCode = ErrorCode.BadCridentials;
                    }
                );
        }
    }

}
