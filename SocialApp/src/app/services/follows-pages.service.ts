import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../pages/auth/auth.service';
import {environment} from '../../environments/environment';
import {switchMap, take} from 'rxjs/operators';
import {FollowsResponse} from '../models/Follows-response.model';


@Injectable({
  providedIn: 'root'
})
export class FollowsPagesService {
  serverUrl = environment.url;

  constructor(
                private http: HttpClient
              , private auth: AuthService) {}

   getFollows(userId: string, followType: string) {
    return this.auth.token.pipe(take(1), switchMap(token => {
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${token}`
            })
          };
            return this.http.get<FollowsResponse>(`${this.serverUrl}/users/${userId}/${followType}`, httpOptions);
        }
    ));
   }
}
