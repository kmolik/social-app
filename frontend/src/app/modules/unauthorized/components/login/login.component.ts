import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../../../../core/authentication/api/login.service";
import {AuthService} from "../../../../core/authentication/services/auth.service";
import {TokenStorageService} from "../../../../core/authentication/services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {
    this.form = this.generateForm();
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //this.roles = this.tokenStorage.getUser().roles;
    }
  }

  generateForm(): FormGroup {
    return this.fb.group({
      email: [''],
      password: [''],
    });
  }

  submitForm() {
    this.authService.login(this.form.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.userId);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    /*console.log(this.form.value);
    this.loginService.login(this.form.value).subscribe((token) => {
      console.log(token);
      console.log('sign in success');
    }, error => {
      console.log(error);
    }
    );*/
  }

}
