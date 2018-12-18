import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/auth/store/auth.state';
import { AuthStatusCheckAction } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  constructor(public store: Store<AuthState>) {}

  ngOnInit() {
    this.store.dispatch(new AuthStatusCheckAction());
  }
}
