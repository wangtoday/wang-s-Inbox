import { Component, OnInit } from '@angular/core';
import { DaiGouState } from '../../store/daigou.state';
import { Store } from '@ngrx/store';
import { DaigouService } from '../../services/daigou.service';
import { DgChangeToTracking } from '../../store/daigou.actions';

@Component({
  selector: 'app-tobuy',
  templateUrl: './tobuy.component.html',
  styleUrls: ['./tobuy.component.css']
})
export class TobuyComponent implements OnInit {
  error: string = '';
  toggleTracking = false;

  trackingnumber = '';

  dTobuyTable: any = [];
  loading = true;

  toggleData: any;

  toggleToTracking(data) {
    this.toggleTracking = true;
    this.toggleData = data;
  }

  handleCancel() {
    this.toggleTracking = false;
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
      this.toggleTracking = false;
    }, 2000);
  }

  constructor(
    private daigouService: DaigouService,
    private store: Store<DaiGouState>
  ) {}

  ngOnInit() {
    this.store.select('daigou').subscribe(value => {
      this.dTobuyTable = value.dToBuyList;
      this.loading = false;
    });
  }
}
