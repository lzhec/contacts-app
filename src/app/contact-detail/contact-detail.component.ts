import { Component, OnInit } from '@angular/core';
import {visibility} from '../shared/services/animations';
import {Contact} from '../shared/contact-interface';
import {FieldInput} from '../shared/dynamicForms/field-interface';
import {ActivatedRoute, Router} from '@angular/router';
import {AppDataService} from '../shared/services/app-data.service';

@Component({
  selector: 'app-contant-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
  animations: [visibility]
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  operation: string; // edit/ read/ create
  errorMessage: string;

  contactDefinitionInput: Array<FieldInput> = [
    {
      key: 'id',
      type: 'number',
      isId: true,
      label: 'Id',
      required: true
    },
    {
      key: 'firstName',
      type: 'string',
      isId: false,
      label: 'First name',
      required: true
    },
    {
      key: 'lastName',
      type: 'string',
      isId: false,
      label: 'Last name',
      required: false
    },
    {
      key: 'address',
      type: 'string',
      isId: false,
      label: 'Address',
      required: false
    },
    {
      key: 'number',
      type: 'number',
      isId: false,
      label: 'Phone',
      required: true
    },
    {
      key: 'email',
      type: 'string',
      isId: false,
      label: 'Email',
      required: false
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute, private appDataService: AppDataService) { }

  ngOnInit(): void {
    this.operation = this.route.snapshot.params['operation'];

    if (this.operation === 'create') {
      this.contact = { id: 0, firstName: '', number: ''};
    } else {
      this.appDataService.getContact(+this.route.snapshot.params['id']).subscribe((contact: Contact) => this.contact = contact[0]);
    }
  }

  createContact(contact: Contact) {
    contact.id = 0;
    this.errorMessage = null;
    this.appDataService.createContact(contact).subscribe(
      c => this.router.navigate(['/authenticated/contact-list']),
      error => this.errorMessage = 'Error creating contact'
    );
  }
  updateContact(contact: Contact) {
    this.errorMessage = null;
    this.appDataService.updateContact(contact).subscribe(
      c => this.router.navigate(['/authenticated/contact-list']),
      error => this.errorMessage = 'Error updating contact'
    );

  }

}
