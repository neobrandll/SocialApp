import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../pages/auth/auth.service';
import {switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  serverUrl = environment.url;
  constructor(private http: HttpClient, private auth: AuthService) { }

  updatePicture(image: any) {
    return this.auth.token.pipe(take(1), switchMap(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      const body = new FormData();
      body.append('image', image);
      return this.http.post<any>(`${this.serverUrl}/users/photo`, body , httpOptions);
    }));

  }
}


