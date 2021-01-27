import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

import { UserApi } from '../user-api';
import { UserService } from '../../../app/shared/services/user.service';
import {visibility} from '../../shared/services/animations';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [visibility]
})
export class SignInComponent implements OnInit {
  submitting = false;
  formError: string;

  constructor(private userApi: UserApi, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm) {
    if (signInForm.valid) {
      this.submitting = true;
      this.formError = null;

      this.userApi.signIn(signInForm.value.email, signInForm.value.password).subscribe((data) => {
        this.router.navigate(['/authenticated']);
      },
      (error) => {
        this.submitting = false;
        this.formError = error;
      });
    }
  }

}
