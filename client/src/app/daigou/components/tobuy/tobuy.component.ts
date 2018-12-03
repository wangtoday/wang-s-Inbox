import { Component, OnInit } from '@angular/core';
import { DaiGouState } from '../../store/daigou.state';
import { Store } from '@ngrx/store';
import { DaigouService } from '../../services/daigou.service';
import { DgChangeToTracking } from '../../store/daigou.actions';
import {
  NotificationOnAction,
  NotificationOffAction
} from 'src/app/store/notification.action';

@Component({
  selector: 'app-tobuy',
  templateUrl: './tobuy.component.html',
  styleUrls: ['./tobuy.component.css']
})
export class TobuyComponent implements OnInit {
  error: string = '';
  toggleStatus = false;
  toggleModal: boolean = false;

  trackingnumber = '';
  selectedProgress = '';

  dTobuyTable: any = [];
  loading = true;

  toggleData: any;

  toggleToTracking(data) {
    this.toggleModal = true;
    this.toggleData = data;

    this.store.dispatch(new NotificationOnAction());
  }

  handleCancel() {
    this.store.dispatch(new NotificationOffAction());
    console.log('toggle close');
    this.toggleModal = false;
  }

  tracking() {
    if (this.trackingnumber === '') {
      this.error = '请输入快递单号!';
      setTimeout(() => {
        this.error = '';
      }, 1000);
      return;
    }

    this.store.dispatch(
      new DgChangeToTracking({
        ...this.toggleData,
        ...{ tracknumber: this.trackingnumber }
      })
    );

    setTimeout(() => {
      this.toggleModal = false;
    }, 2000);
  }

  constructor(
    private daigouService: DaigouService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.store.select('daigou').subscribe(value => {
      this.dTobuyTable = value.dToBuyList;
      this.loading = false;
    });

    // notification listener
    this.store.select('notification').subscribe(value => {
      console.log('value: ', value);
      this.toggleStatus = value.loading;
    });
  }
}
