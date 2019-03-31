import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../pages/auth/auth.service';
import {switchMap, take} from 'rxjs/operators';
import {Observable, Observer, of} from 'rxjs';
import {NewCommentComponent} from '../components/new-comment/new-comment.component';
import {SimpleAlertService} from './simple-alert.service';
import {ModalController} from '@ionic/angular';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  serverUrl = environment.url;
  constructor(private http: HttpClient
              , private auth: AuthService
              , private alertService: SimpleAlertService
              , private modalCtrl: ModalController) { }


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

    newComment(post: any) {
      return Observable.create((observer: Observer<any>) => {
          this.modalCtrl.create({component: NewCommentComponent, componentProps: {post: post}})
              .then(modalEl => {
                  modalEl.present();
                  return modalEl.onDidDismiss();
              }).then(resultData => {
              if (resultData.role === 'confirm') {
                  const body = new HttpParams()
                      .set('comment', resultData.data.comment)
                      .set('tweet', post._id);
                  const httpOptions = {
                      headers: new HttpHeaders({
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'Authorization': `Bearer ${resultData.data.user._token}`
                      })
                  };
                  this.http.post<any>(`${this.serverUrl}/tweets/${post._id}/comments`, body.toString(), httpOptions).subscribe(respData => {
                      observer.next(respData);
                      observer.complete();
                  });
              } else {
                  observer.next({msg: 'error'});
              }
          });
      });
    }
}

