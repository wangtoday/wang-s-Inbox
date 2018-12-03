import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { valueFunctionProp } from 'ng-zorro-antd';
import { DgGetListAction } from '../store/daigou.actions';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  loading = true;

  constructor(public store: Store<any>) {}

  ngOnInit() {
    this.store.select('auth').subscribe(value => {
      if (value.status) {
        this.loading = false;
        this.store.dispatch(new DgGetListAction(value.user.userid));
      }
    });
  }
}
