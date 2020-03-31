import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = '';
  successMessage = '';
  registerTabIndex: number;
  tabIndex = 0;

  constructor(public authService: AuthService, public route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.registerTabIndex = params.registerIndex;
      this.transitionBtnTab();
      this.tabIndex = 0;
    });
  }

  // metoda loginu
  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password).then(res => {
      console.log(res);
    }, err => {
      console.log(err);

      switch (err.code) {
        case 'auth/wrong-password': {
          err.message = 'Nieprawidłowe hasło!';
          this.errorMessage = err.message;
          return this.errorMessage;
        }
        case 'auth/invalid-email': {
          err.message = 'Źle sformatowany e-mail.';
          this.errorMessage = err.message;
          return this.errorMessage;
        }
        case 'auth/user-not-found': {
          err.message = 'Nie ma takiego konta.';
          this.errorMessage = err.message;
          return this.errorMessage;
        }
        case 'auth/too-many-requests': {
          err.message = 'Zbyt wiele nieudanych prób logowania. Spróbuj ponownie później.';
          this.errorMessage = err.message;
          return this.errorMessage;
        }
        default: {
          err.message = 'Spróbuj później.';
          this.errorMessage = err.message;
          return this.errorMessage;
        }
      }
    });
  }

  public transitionBtnTab() {
    const tabCount = 2;
    this.tabIndex = (this.tabIndex + 1) % tabCount;
  }
}
