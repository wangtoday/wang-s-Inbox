import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { DgGetListAction } from '../../store/daigou.actions';

@Component({
  selector: 'app-daigou',
  templateUrl: './daigou.component.html',
  styleUrls: ['./daigou.component.css']
})
export class DaigouComponent implements OnInit {
  @Input('userid') userid: any = '';
  constructor(public store: Store<any>) {}

  ngOnInit() {
    console.log('--->', this.userid);

    this.store.dispatch(new DgGetListAction(this.userid));

    this.store.select('daigou').subscribe(value => {
      console.log('获取store', value);
    });
  }
}
