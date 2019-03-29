import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../pages/auth/auth.service';
import {switchMap, take, tap} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  serverUrl = environment.url;
  constructor(private http: HttpClient, private auth: AuthService) { }

  updatePicture(image: any) {
    let firstToken: string;
    return this.auth.token.pipe(take(1), switchMap(token => {
      firstToken = token;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      const body = new FormData();
      body.append('image', image);
      return this.http.post<any>(`${this.serverUrl}/users/photo`, body , httpOptions);
    }), tap(data => {
      const newUser = new User(
          data.user.token
          , data.user._id
          , data.user.email
          , data.user.name
          , data.user.username
          , data.user.followers
          , data.user.following
          , data.user.profileImage);
      this.auth.updateUser(newUser);
    }));

  }
}


