import { Component, OnInit } from '@angular/core';
import { Role } from 'src/model/role'
import { RoleService } from 'src/shared/services/role/role.service';
import { User } from 'src/model/user';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jwt-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

    user: User = new User();
    selectedRole: Role = null;
    roles: Role[];

    constructor (
        private roleService: RoleService,
        private authService: AuthService,
        private fb: FormBuilder,
        private router: Router) { }

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/profile'])
        }
        this.initRolesList();
        this.initUser();
    }

    initUser(): any {
        this.user.firstName = 'John';
        this.user.lastName = 'Doe';
        this.user.username = 'johndoe';
        this.user.password = 'johndoe';
        this.user.email = 'john.doe@example.com';
        
    }

    initRolesList(): any {
        this.roleService.getRoles()
        .subscribe(
            res => this.roles = res,
            err => console.error(err)
        );
    }

    onSubmit(): void {
        this.user.roles = [];
        this.user.roles.push(this.selectedRole);
        this.authService.signup(this.user).subscribe(
            res => this.router.navigate(['/profile']),
            err => console.error(err)
        );
    }

}
