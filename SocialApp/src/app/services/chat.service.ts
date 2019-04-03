import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserProfile} from '../models/userProfile.model';
import {environment} from '../../environments/environment';
import {AuthService} from '../pages/auth/auth.service';
import {switchMap, take, tap} from 'rxjs/operators';
import {ChatPostResponse, ChatsArray} from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  serverUrl = environment.url;

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  mailedUser(mailedUserId: string) {
    return this.auth.token.pipe(take(1), switchMap(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      const urlAction = `${this.serverUrl}/users/${mailedUserId}`;
      return this.http.get<UserProfile>(urlAction, httpOptions);
    }));
  }

  sendMsg(userId: string, message: string) {
    return this.auth.token.pipe(take(1), switchMap(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      const body = new HttpParams()
          .set('message', message);
      const urlAction = `${this.serverUrl}/message/${userId}`;
      return this.http.post<ChatPostResponse>(urlAction, body.toString(), httpOptions);
    }));
  }

  loadChat(mailedUserId: string) {
    return this.auth.token.pipe(take(1), switchMap(token => {
      const actionUrl = `${this.serverUrl}/chat/get/${mailedUserId}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.get<ChatPostResponse>(actionUrl, httpOptions);
    }));
  }


  loadChatsArray() {
    return this.auth.token.pipe(take(1), switchMap(token => {
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${token}`
            })
          };
          return this.http.get<ChatsArray>(`${this.serverUrl}/chats`, httpOptions);
        }
    ));
  }
}
