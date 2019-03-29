import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../pages/auth/auth.service';
import {switchMap, take, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {SimpleAlertService} from './simple-alert.service';

@Injectable({
  providedIn: 'root'
})
export class LikesSubscriptionsService {
  serverUrl = environment.url;

  constructor(private auth: AuthService, private http: HttpClient, private alert: SimpleAlertService) { }




  subscriptionHandler(userId: string, following: any) {
    return this.auth.token.pipe(take(1), tap(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      if (following) {
      this.http.delete<any>(`${this.serverUrl}/users/${userId}/follow`, httpOptions).subscribe(() => {
        }, error => {
          this.alert.showAlert('Error', error);
        });
      } else {
       this.http.post<any>(`${this.serverUrl}/users/${userId}/follow`, null , httpOptions).subscribe(() => {
        }, error => {
          this.alert.showAlert('Error', error);
        });
      }
    }));
  }

}
