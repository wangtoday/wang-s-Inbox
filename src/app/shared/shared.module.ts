import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgZorroAntdModule],
  exports: [ReactiveFormsModule, FormsModule, NgZorroAntdModule],
  declarations: []
})
export class SharedModule {}
