import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: Array<User> = [];
  newuser = false;
  private isuser: boolean;
  private isadmin: boolean;

  constructor(private userService: UserService) { }

  getUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  modifyUser(f: NgForm, user) {
    this.userService.modifyUser({
      isuser: f.value.isuser,
      isadmin: f.value.isadmin
    }, user._id).subscribe(() => {
      console.log(user._id);
      user.edit = false;
    });
  }

  deleteUser(user) {
    this.userService.deleteUser(user._id).subscribe(() => {
      console.log('User deleted ' + user._id);
      this.getUsers();
    });
  }

  addUser(f: NgForm) {
    this.userService.addUser({
      username: f.value.username,
      email: f.value.email,
      password: f.value.password,
      isuser: f.value.isuser,
      isadmin: f.value.isadmin
    }).subscribe(() => {
      this.getUsers();
      this.newuser = false;
      this.isuser = false;
      this.isadmin = false;
    });
  }

  edit(user) {
    user.edit = !user.edit;
  }

  newUser() {
    this.newuser = !this.newuser;
  }

  ngOnInit() {
    this.getUsers();
    this.isuser = false;
    this.isadmin = false;
  }

}
