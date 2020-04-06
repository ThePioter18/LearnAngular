import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  navLinks = [
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
  ];

  constructor(public authService: AuthService, public route: ActivatedRoute, private router: Router) { }


  // metoda loginu
  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password).then(() => {
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
    this.router.navigate(['register']);

  }
}
