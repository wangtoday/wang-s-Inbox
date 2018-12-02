import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { valueFunctionProp } from 'ng-zorro-antd';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  loading = true;
  userid = '';

  constructor(public store: Store<any>) {}

  ngOnInit() {
    this.store.select('auth').subscribe(value => {
      if (value.status) {
        this.loading = false;
        this.userid = value.user.userid;
      }
    });
  }
}
