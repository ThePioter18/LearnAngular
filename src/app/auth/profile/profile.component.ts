import { AuthService } from './../auth.service';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userList: User[];

  constructor(private usersService: UsersService, public authService: AuthService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(userAll => {
      this.userList = userAll;
    });
  }

}
