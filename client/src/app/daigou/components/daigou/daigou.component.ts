import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DgAddToBuyAction } from '../../store/daigou.actions';

@Component({
  selector: 'app-daigou',
  templateUrl: './daigou.component.html',
  styleUrls: ['./daigou.component.scss']
})
export class DaigouComponent implements OnInit {
  options = [
    {
      value: '爱他美',
      label: '爱他美',
      children: [
        {
          value: '一段',
          label: '一段',
          isLeaf: true
        },
        {
          value: '二段',
          label: '二段',
          isLeaf: true
        },
        {
          value: '三段',
          label: '三段',
          isLeaf: true
        },
        {
          value: '四段',
          label: '四段',
          isLeaf: true
        }
      ]
    }
  ];

  selectItem = '';
  // tslint:disable-next-line:no-input-rename

  toggleModal: boolean = false;
  panelStyle = {
    background: '#f7f7f7',
    'border-radius': '4px',
    'margin-bottom': '10px',
    border: '0px'
  };

  buyForm: FormGroup;
  buyerInfo;

  showModal(data) {
    this.toggleModal = true;
    this.buyerInfo = data;
  }

  handleOk() {
    let { itemname, number } = this.buyForm.value;
    itemname = itemname.toString().replace(',', '');

    this.store.dispatch(
      new DgAddToBuyAction({
        ...this.buyerInfo,
        ...{
          itemname,
          number
        }
      })
    );

    this.toggleModal = false;

    console.log(itemname, number);
    this.buyForm.reset();
  }

  handleCancel() {
    this.buyForm.reset();
    this.toggleModal = false;
  }

  onChanges(event) {
    console.log(event);
  }

  buySubmit(): void {
    for (const i in this.buyForm.controls) {
      this.buyForm.controls[i].markAsDirty();
      this.buyForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder, public store: Store<any>) {}

  ngOnInit() {
    this.store.select('daigou').subscribe(value => {
      console.log('获取store', value);
    });

    this.buyForm = this.fb.group({
      itemname: [null, [Validators.required]],
      number: [null, [Validators.required]]
    });
  }
}
