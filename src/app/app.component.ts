import { UsersService } from './services/users.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User;
  email: string;
  usersList: Array<{ username: string; age: number; emailUser: string }> = [];

  constructor(
    public authService: AuthService,
    private router: Router,
    private angularFire: AngularFireAuth,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.angularFire.authState.subscribe(user => {

      this.user = user;

      if (user) {
        this.email = this.user.email;
      } else {
        this.router.navigate(['/login']);
      }

      const login = this.router.isActive('/login', true);
      if (user && login) {
        this.router.navigate(['/home']);
      }

    });

    this.usersService.getUsers().subscribe(user => {
      this.usersList = user;
    });

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
