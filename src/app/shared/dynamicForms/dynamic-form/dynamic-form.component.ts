import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {FieldInput} from '../field-interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() vm: any;
  @Input() vmDefinition: Array<FieldInput>;
  @Input() operation: string;
  @Input() errorMessage: string;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  status: string;
  submitted = false;
  vmCopy: any;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.clearForm();
    this.route.params.subscribe(params => {
      this.operation = params['operation'];
      this.clearForm();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errorMessage'].currentValue && this.status === 'waiting') {
      this.status = '';
    }
  }

  clearForm() {
    const group = {};
    this.vmCopy = Object.assign({}, this.vm);

    this.vmDefinition.forEach(field => {
      group[field.key] = field.required ?
        new FormControl(this.vmCopy[field.key], Validators.required) :
        new FormControl(this.vmCopy[field.key]);
    });

    this.form = new FormGroup(group);
  }

  onBack() {
    this.errorMessage = null;
    this.location.back();
  }

  onEdit() {
    this.router.navigate(['../', 'edit'], {relativeTo: this.route});
  }

  onCancel() {
    this.onBack();
  }

  onSave() {
    this.submitted = true;

    if (this.form.valid) {
      this.status = 'waiting';
      this.update.emit(this.form.value);
    }
  }

  onCreate() {
    this.submitted = true;

    if (this.form.valid) {
      this.status = 'waiting';
      this.create.emit(this.form.value);
    }
  }

}
