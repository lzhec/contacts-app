import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import {UserApi} from '../user-api';
import {visibility} from '../../shared/services/animations';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [visibility]
})
export class RegistrationComponent implements OnInit {
  registering = false;
  hasAdded = false;

  constructor(private router: Router, private userApi: UserApi) { }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm) {
    this.registering = true;
    this.userApi.registerUser(registerForm.value).subscribe(() => {
      setTimeout(() => {this.hasAdded = true; }, 1200);
      setTimeout(() => {this.router.navigate(['/sign-in']); }, 2000);
    });
  }

}
