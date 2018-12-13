import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DgAddToBuyAction } from '../../store/daigou.actions';

import * as _ from 'lodash';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { DaigouService } from '../../services/daigou.service';

@Component({
  selector: 'app-daigou',
  templateUrl: './daigou.component.html',
  styleUrls: ['./daigou.component.scss']
})
export class DaigouComponent implements OnInit {
  isOkLoading: boolean = false;

  addColStatus: boolean = false;

  Contactlist: any[] = [];

  idPictures: any[] = [];

  sorttype = 'sort-descending';
  stepData = [
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
  ];
  options = [
    {
      value: '爱他美',
      label: '爱他美',
      children: this.stepData
    },
    {
      value: '爱他美铂金',
      label: '爱他美铂金',
      children: this.stepData
    },
    {
      value: 'A2',
      label: 'A2',
      children: this.stepData
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

  selectFile: any;
  detectFiles(event) {
    this.daigouService.uploadFile(event.target.files[0]);
  }
  demoUpload(element) {
    console.log(element);
    element.nativeElement.trigger();
    // console.log(this.selectFile);
  }
  // 自定义上传的部分

  toggleaddColStatus(event) {
    this.addColStatus = event;
  }

  /**
   * front end sort
   */
  sort() {
    console.log('sort ');
    this.Contactlist = _.sortBy(this.Contactlist, ['name']);

    this.sorttype =
      this.sorttype === 'sort-ascending' ? 'sort-descending' : 'sort-ascending';

    if (this.sorttype === 'sort-ascending') {
      this.Contactlist = _.reverse(this.Contactlist);
    }
  }

  showModal(data) {
    this.toggleModal = true;
    this.buyerInfo = data;
  }

  handleOk() {
    this.buySubmit();
  }

  handleCancel() {
    this.buyForm.reset();
    this.toggleModal = false;
  }

  onChanges(event) {
    console.log(event);
  }

  buySubmit(): void {
    // tslint:disable-next-line:forin
    for (const i in this.buyForm.controls) {
      this.buyForm.controls[i].markAsDirty();
      this.buyForm.controls[i].updateValueAndValidity();
    }
    if (this.buyForm.valid) {
      // tslint:disable-next-line:prefer-const
      let { itemname, number } = this.buyForm.value;
      itemname = itemname.toString().replace(',', '');
      this.isOkLoading = true;
      this.store.dispatch(
        new DgAddToBuyAction({
          ...this.buyerInfo,
          ...{
            itemname,
            number
          }
        })
      );

      // this.toggleModal = false;

      console.log(itemname, number);
    } else {
      return;
    }
  }

  constructor(
    private http: HttpClient,
    private daigouService: DaigouService,
    private msg: NzMessageService,
    private fb: FormBuilder,
    public store: Store<any>
  ) {}

  ngOnInit() {
    this.buyForm = this.fb.group({
      itemname: [null, [Validators.required]],
      number: [null, [Validators.required]]
    });

    this.store.select('notification').subscribe(value => {
      console.log('notification status:', value);
      if (!value.loading) {
        this.buyForm.reset();
        this.isOkLoading = false;
        setTimeout(() => {
          this.toggleModal = false;
        }, 400);
      }
    });

    this.store.select('daigou').subscribe((value: any) => {
      console.log('获取store', value);
      if (value) {
        this.Contactlist = value.dUserList;
      }
    });
  }

  // 上传身份证控制模板

  // tslint:disable-next-line:member-ordering
  isUPIDVisible: boolean = false;
  showUPIDModal(): void {
    this.isUPIDVisible = true;
  }

  handleUPIDOk(): void {
    console.log('Button ok clicked!');
    this.isUPIDVisible = false;
  }

  handleUPIDCancel(): void {
    console.log('Button cancel clicked!');
    this.isUPIDVisible = false;
  }
}
