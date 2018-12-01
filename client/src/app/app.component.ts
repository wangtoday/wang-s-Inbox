import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from './auth/store/auth.state';

import { firebase } from '@firebase/app';
import '@firebase/auth';
import { Observable } from 'rxjs';
import {
  LoginSuccessAction,
  AuthStatusAction
} from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  constructor(private store: Store<AuthState>) {}
  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    // firebase.auth().signOut();
  }
}
