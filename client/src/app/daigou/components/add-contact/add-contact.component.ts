import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DgAddContactAction } from '../../store/daigou.actions';

// third library
import * as libphonenumber from 'google-libphonenumber';
import { PhoneValidator } from 'src/app/tooltips/phone-validator';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;
  userid: string;

  constructor(private store: Store<any>, private fb: FormBuilder) {}

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.contactForm.controls) {
      this.contactForm.controls[i].markAsDirty();
      this.contactForm.controls[i].updateValueAndValidity();
    }

    if (this.contactForm.valid) {
      this.store.dispatch(
        new DgAddContactAction({
          ...this.contactForm.value,
          ...{ userid: this.userid, record: [] }
        })
      );
    }
  }

  ngOnInit() {
    this.store.select('auth').subscribe(value => {
      this.userid = value.user.userid;
    });
    this.contactForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNumberPrefix: [null],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });

    this.contactForm.get('phone').validator = PhoneValidator.validCountryPhone(
      this.contactForm.get('phoneNumberPrefix')
    );
  }
}
