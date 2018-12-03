import { Component, OnInit } from '@angular/core';
import { DaiGouState } from '../../store/daigou.state';
import { Store } from '@ngrx/store';

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
    this.store.select('daigou').subscribe(value => {
      console.log('获取store', value);
      this.loading = false;
      this.daigouTable = value.dTrackingList;
    });
  }
}
