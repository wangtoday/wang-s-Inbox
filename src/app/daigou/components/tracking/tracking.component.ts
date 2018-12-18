import { Component, OnInit } from '@angular/core';
import { DaiGouState } from '../../store/daigou.state';
import { Store } from '@ngrx/store';
import { DgGetListAction } from '../../store/daigou.actions';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  daigouTable;
  loading: boolean = true;
  constructor(private store: Store<DaiGouState>) {}

  ngOnInit() {
    this.store.select('auth').subscribe(value => {
      if (value.status) {
        this.loading = false;
        this.store.dispatch(new DgGetListAction(value.user.userid));
      }
    });

    this.store.select('daigou').subscribe(value => {
      console.log('获取store', value);
      this.loading = false;
      this.daigouTable = value.dTrackingList;
    });
  }
}
