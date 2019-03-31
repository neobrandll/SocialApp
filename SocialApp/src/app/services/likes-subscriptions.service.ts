import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../pages/auth/auth.service';
import {switchMap, take, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {SimpleAlertService} from './simple-alert.service';
import {Observable, Observer, of} from 'rxjs';

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

  likeHandler(postId: string, liked: boolean) {
    return Observable.create((observer: Observer<boolean>) => {
      this.auth.token.pipe(take(1), switchMap(token => {
        let urlAction: string;
        if (liked) {
          urlAction = `${this.serverUrl}/tweets/${postId}/favorites/unlike`;
        } else {
          urlAction = `${this.serverUrl}/tweets/${postId}/favorites`;
        }
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
          })
        };
        const body = new HttpParams()
            .set('tweet', postId);
        return this.http.post<any>(urlAction, body.toString(), httpOptions);
      }) ).subscribe(() => {
        liked = !liked;
        observer.next(liked);
        observer.complete();
        // this.postService.fetchPosts().pipe(take(1)).subscribe(posts => {
        //   const newPost = posts.filter(post => post._id === postId);
        //   this.post = newPost[0];
        // });
      }, error => {
        this.alert.showAlert('Error', 'An error has occurred trying to like the post');
        observer.next(liked);
        observer.complete();
      });
    });

  }

}
