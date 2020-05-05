import { TasksService } from './../../services/tasks.service';
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

  show = false;
  currentPassword = '';

  constructor(private usersService: UsersService, public authService: AuthService, private tasksService: TasksService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(userAll => {
      this.userList = userAll;
    });

  }

  deleteAccount(userL, currentPassword) {

    const response = confirm('Czy na pewno chcesz usunąć? \nKonto oraz wszystkie dane tego użytkownika zostaną usunięte.');
    if (response) {
      this.authService.deleteAccount(userL, currentPassword);
    }

    console.log('deleteAccount(userL, currentPassword)', userL, currentPassword);
  }

  onSwitch() {
    this.show = !this.show;
  }

}
