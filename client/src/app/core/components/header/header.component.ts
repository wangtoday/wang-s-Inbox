import { Component, OnInit } from '@angular/core';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Store } from '@ngrx/store';
import { AuthStatusCheckAction } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // header的作用就是loading菜单, 需要动态的loading一些菜单.
  constructor(private store: Store<AuthState>) {}

  ngOnInit() {
    // TODO: 下面这个以后可以撤掉, 因为用户进入, 肯定都是登录进入的,
    // 不需要再这里又重新实例化一下store
    this.store.dispatch(new AuthStatusCheckAction());

    this.store.select('auth').subscribe(value => {
      console.log('status :', value);
    });
  }
}
