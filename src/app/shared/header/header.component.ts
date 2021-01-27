import { Component, OnInit } from '@angular/core';

import {UserService} from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userInfo = localStorage.getItem('user');

    if (userInfo) {
      this.userInfo = JSON.parse(userInfo).name;
    }
  }

  signOut() {
    this.userService.signOut();
  }

}
