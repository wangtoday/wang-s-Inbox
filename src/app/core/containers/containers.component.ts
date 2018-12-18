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

  // 验证的地方在 header 这个地方,  吊得很
  constructor(public store: Store<AuthState>) {}

  ngOnInit() {
    this.store.dispatch(new AuthStatusCheckAction());
  }
}
