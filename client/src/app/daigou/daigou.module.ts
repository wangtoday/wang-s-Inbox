import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DaigouComponent } from './components/daigou/daigou.component';
import { StoreModule } from '@ngrx/store';
import { daigouReducer } from './store/daigou.reducer';
import { ContainerComponent } from './container/container.component';
import { SharedModule } from '../shared/shared.module';

const daigouRoute: Routes = [
  {
    path: '',
    component: ContainerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(daigouRoute),
    StoreModule.forFeature('daigou', daigouReducer)
  ],
  declarations: [DaigouComponent, ContainerComponent]
})
export class DaigouModule {}
