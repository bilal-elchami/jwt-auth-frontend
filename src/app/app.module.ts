import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { LoginComponent } from 'src/routes/login/login.component';
import { SignUpComponent } from 'src/routes/signup/signup.component';
import { RoleService } from 'src/shared/services/role/role.service';
import { UserProfileComponent } from 'src/routes/user-profile/user-profile.component';
import { PageNotFoundComponent } from 'src/routes/page-not-found/page-not-found.component';
import { HomeComponent } from 'src/routes/home/home.component';
import { UserListComponent } from 'src/routes/user-list/user-list.component';
import { UserService } from 'src/shared/services/user/user.service';
import { JwtModule } from '@auth0/angular-jwt';

const appRoutes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export function tokenGetter() {
  return localStorage.getItem('auth_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent,
    UserListComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        // blacklistedRoutes: ['localhost:8080']
      }
    })
  ],
  providers: [
    AuthService,
    RoleService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
