import { Component, OnInit } from '@angular/core';
import { DaiGouState } from '../../store/daigou.state';
import { Store } from '@ngrx/store';
import { DaigouService } from '../../services/daigou.service';
import { DgChangeToTracking } from '../../store/daigou.actions';
import {
  NotificationOnAction,
  NotificationOffAction
} from 'src/app/store/notification.action';

import * as _ from 'lodash';

@Component({
  selector: 'app-tobuy',
  templateUrl: './tobuy.component.html',
  styleUrls: ['./tobuy.component.css']
})
export class TobuyComponent implements OnInit {
  selectedProgress = 'Auexpress';
  error: string = '';
  toggleStatus = false;
  toggleModal: boolean = false;

  trackingnumber = '';

  dTobuyTable: any = [];
  loading = true;

  toggleData: any;

  buyerlist = [
    // { text: 'London', value: 'London', byDefault: true },
    // { text: 'Sidney', value: 'Sidney' }
  ];

  sortName = null;
  sortValue = null;
  searchAddress = 'London';

  displayData = [];

  filter(searchAddress: string): void {
    console.log('what come here:', searchAddress);
    this.searchAddress = searchAddress;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item =>
      this.searchAddress ? item.buyer.indexOf(this.searchAddress) !== -1 : true;
    const data = this.dTobuyTable.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1
      );
    } else {
      this.displayData = data;
    }
  }

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
        ...{ tracknumber: this.trackingnumber, progress: this.selectedProgress }
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

      // setTimeout(() => {
      if (this.dTobuyTable.length > 0) {
        this.displayData = this.dTobuyTable;

        this.displayData.forEach(element => {
          this.buyerlist.push({ text: element.buyer, value: element.buyer });
        });
        // console.log('add: ', this.buyerlist);
        this.buyerlist = _.uniqBy(this.buyerlist, 'text');
        this.loading = false;
      }
      // });
    });

    // notification listener
    this.store.select('notification').subscribe(value => {
      console.log('value: ', value);
      this.toggleStatus = value.loading;
    });
  }
}
