import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';

import {UserApi} from '../../user/user-api';
import {User} from '../user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserApi {
  isAuthenticated = false;
  private url = 'http://localhost:3000/users';

  constructor(private router: Router, private http: HttpClient) { }

  signIn(email: string, password: string): Observable<any> {
    return this.http.get(this.url).pipe(delay(2000), map((response: any) => {
      const arrayFilter: User[] = response.filter((item: User) =>
        item.email === email && item.password === password);

      if ( arrayFilter.length !== 0) {
        this.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(arrayFilter[0]));
      } else {
        throw new Error('Invalid email or password');
      }
    }));
  }

  signOut(): Observable<any> {
    this.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/sign-in']);
    return of({});
  }

  registerUser(registerForm: User) {
    return this.http.post(this.url, {name: registerForm.name, email: registerForm.email, password: registerForm.password});
  }
}
