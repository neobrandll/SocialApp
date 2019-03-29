import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../pages/auth/auth.service';
import {switchMap, take} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  serverUrl = environment.url;
  constructor(private http: HttpClient, private auth: AuthService) { }


  deleteComment(postId: string, commentId: string) {
   return this.auth.token.pipe(take(1), switchMap(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        })
      };
     return this.http.delete<any>(`${this.serverUrl}/tweets/${postId}/comment/${commentId}`, httpOptions);
    }));
  }
}

