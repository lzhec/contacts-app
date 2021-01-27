import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {Contact} from '../shared/contact-interface';
import {AppDataService} from '../shared/services/app-data.service';

@Component({
  selector: 'app-contant-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  Contacts: Array<Contact>;
  errorMessage: string
  deleteError: string;
  deleteId: number;
  isDeleting = false;

  constructor(private router: Router, private appDataService: AppDataService) {
    appDataService.getContacts().subscribe((data) => this.Contacts = data);
  }

  ngOnInit(): void {
  }

  createContact() {
    this.router.navigate(['/authenticated/contact', 0, 'create']);
  }

  showDetail(id: number) {
    this.router.navigate(['/authenticated/contact', id, 'details']);
  }

  editContact(id: number) {
    this.router.navigate(['/authenticated/contact', id, 'edit']);
  }

  deleteContactQuestion(id: number) {
    this.deleteError = null;
    this.deleteId = id;
  }

  deleteContact(id: number) {
    this.isDeleting = true;
    this.appDataService.deleteContact(id).subscribe(c => {
      this.cancelDelete();
      this.Contacts = this.Contacts.filter(carItem => carItem.id !== id);
    }, error => {
        this.deleteError = error;
        this.isDeleting = false;
    });
  }

  cancelDelete() {
    this.isDeleting = false;
    this.deleteId = null;
  }

  searchContact(event) {
    const str = event.target.value;
    this.appDataService.searchContacts(str).subscribe((data) => this.Contacts = data);
  }

}
