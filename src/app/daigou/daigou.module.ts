import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DaigouComponent } from './components/daigou/daigou.component';
import { StoreModule } from '@ngrx/store';
import { daigouReducer } from './store/daigou.reducer';
import { ContainerComponent } from './container/container.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { DaigouEffects } from './store/daigou.effects';
import { TrackingComponent } from './components/tracking/tracking.component';
import { TobuyComponent } from './components/tobuy/tobuy.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';

const daigouRoute: Routes = [
  {
    path: '',
    component: ContainerComponent
  },
  {
    path: 'tracking',
    component: TrackingComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(daigouRoute),
    StoreModule.forFeature('daigou', daigouReducer),
    EffectsModule.forFeature([DaigouEffects])
  ],
  declarations: [
    DaigouComponent,
    ContainerComponent,
    TrackingComponent,
    TobuyComponent,
    AddContactComponent
  ]
})
export class DaigouModule {}
