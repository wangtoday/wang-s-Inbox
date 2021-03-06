import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { firebase } from '@firebase/app';

if (environment.production) {
  enableProdMode();
}

// 配置 实例化 firebase

const config = environment.firebaseCongif;
firebase.initializeApp(config);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
