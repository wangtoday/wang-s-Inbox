import { Injectable } from '@angular/core';
import { CoreHttpService } from 'src/app/service/core-http.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DaigouService {
  constructor(private coreService: CoreHttpService) {}

  list(userid): Observable<any> {
    const db = this.coreService.fireStore();
    const daigouRef = db.collection('daigou');

    const daigouRef$ = from(daigouRef.where('userid', '==', userid).get());

    return daigouRef$.pipe(
      map(value => {
        const data = [];

        value.forEach(element => {
          data.push(element.data());
        });

        return data;
      })
    );
  }
}
