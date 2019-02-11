import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { FormControl, Validators } from '@angular/forms';
import { AlertService } from '../shared/alert/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usernameFormControl: FormControl = new FormControl('', Validators.compose(
      [Validators.required, Validators.minLength(3), Validators.pattern(/^[\w-_]+$/)]));

  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router,
  ) {}

  login($event: any): void {
    $event.preventDefault();

    if (this.usernameFormControl.valid) {
      this.loginService.login(this.usernameFormControl.value).subscribe(
        response => this.router.navigate(['/']),
        error => {
          this.alertService.showError('Login', error.error.username);
        }
      );
    }
  }
}
