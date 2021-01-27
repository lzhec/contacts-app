import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';

import {Contact} from '../contact-interface';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  private Contacts: Array<Contact>;
  private url = 'http://localhost:3000/contacts';

  constructor(private userService: UserService, private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get(this.url).pipe(map((response: Array<Contact>) => {
      this.Contacts = response;
      return this.Contacts;
    }), catchError((error: Response) => throwError('Server do not response')));
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get(this.url).pipe(map((response: Contact) => {
      return response/*.filter(item => item.id === id)*/;
    }), catchError((error: Response) => throwError('Server do not response')));
  }

  deleteContact( id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id).pipe(map((response) => {
      console.log('Contact deleted');
    }), delay(1200));
  }

  createContact(contact: Contact): Observable<any> {
    return this.http.post(this.url, contact).pipe(map((response) => {
      console.log('Contact created');
    }), delay(1000));
  }

  updateContact(contact: Contact): Observable<any>{
    return this.http.put(this.url + '/' + contact.id, contact).pipe(map((response) => {
      console.log('Contact updated');
    }), delay(1000));
  }

  searchContacts(str: string): Observable<Contact[]> {
    return this.http.get(`${this.url}?q=${str}`).pipe(map((response: Array<Contact>) => {
      this.Contacts = response;
      return this.Contacts;
    }), catchError((error: Response) => throwError('Server do not response')));
  }
}
