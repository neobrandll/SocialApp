import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {switchMap, take} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AuthService} from '../pages/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  serverUrl = environment.url;

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  searchUser(inputValue: string) {
      return this.auth.token.pipe(take(1), switchMap(token =>{
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          })
        };
        const body = new HttpParams()
            .set('search', inputValue);
        return this.http.post<any>(`${this.serverUrl}/users/search`, body.toString(), httpOptions );
      }));
  }
}
