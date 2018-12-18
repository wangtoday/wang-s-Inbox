import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { FeatureSettingComponent } from './components/feature-setting/feature-setting.component';
import { UserinfoSettingComponent } from './components/userinfo-setting/userinfo-setting.component';
import { Routes, RouterModule } from '@angular/router';

const settingRoute: Routes = [
  {
    path: '',
    component: ContainerComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(settingRoute)],
  declarations: [
    ContainerComponent,
    FeatureSettingComponent,
    UserinfoSettingComponent
  ]
})
export class SettingModule {}
