import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) { }

  // metoda loginu
  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password);
  }
  // metoda rejestracji
  signup(formData: NgForm) {
    this.authService.signup(formData.value.email, formData.value.password);
  }
}
