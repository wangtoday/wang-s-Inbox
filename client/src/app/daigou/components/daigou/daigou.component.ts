import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-daigou',
  templateUrl: './daigou.component.html',
  styleUrls: ['./daigou.component.css']
})
export class DaigouComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename

  panelStyle = {
    background: '#f7f7f7',
    'border-radius': '4px',
    'margin-bottom': '10px',
    border: '0px'
  };
// 203.222.140.152
  panels = [
    {
      active: false,
      disabled: false,
      name: 'This is panel header 1',
      customStyle: this.panelStyle
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2',
      customStyle: this.panelStyle
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3',
      customStyle: this.panelStyle
    }
  ];

  constructor(public store: Store<any>) {}

  ngOnInit() {
    this.store.select('daigou').subscribe(value => {
      console.log('获取store', value);
    });
  }
}
