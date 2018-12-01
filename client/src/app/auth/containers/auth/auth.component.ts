import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthStatusAction, LoginAction } from '../../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {
    // setTimeout(() => {
      this.store.dispatch(new AuthStatusAction());
    // }, 3000);

    // setTimeout(() => {
    this.store.select('auth').subscribe(value => {
      console.log('status', value);
    });
    // }, 4000);
  }
}
