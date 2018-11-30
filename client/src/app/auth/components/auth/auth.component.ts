import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth.state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit() {
    // this.store.dispatch({ type: "[AUTH] login" });

    // setTimeout(() => {
    this.store.select('auth').subscribe(value => {
      console.log(value);
    });
    // }, 4000);
  }
}
