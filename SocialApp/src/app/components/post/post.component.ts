import { Component, OnInit, Input } from '@angular/core';
import {Post} from '../../models/post.model';
import {environment} from '../../../environments/environment';
import {NewPostComponent} from '../new-post/new-post.component';
import {PostUserData} from '../../models/postUserData.model';
import {take} from 'rxjs/operators';
import {AlertController, ModalController} from '@ionic/angular';
import {NewCommentComponent} from '../new-comment/new-comment.component';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit {
  @Input() post: Post;
  serverUrl: string;
  constructor(private modalCtrl: ModalController,
              private http: HttpClient,
              private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  this.serverUrl = environment.url;
}

newComment() {
  this.modalCtrl.create({component: NewCommentComponent, componentProps: {post: this.post}})
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      }).then(resultData => {
        if (resultData.role === 'confirm') {
          const body = new HttpParams()
              .set('comment', resultData.data.comment)
              .set('tweet', this.post._id);
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${resultData.data.user._token}`
            })
          };
          this.http.post<any>(`${this.serverUrl}/tweets/${this.post._id}/comments`, body.toString(), httpOptions)
              .subscribe(respData => {
                if ( respData.msg === 'Comment added!') {
                    this.showAlert('Complete!', respData.msg);
                }
              }, error => {
                this.showAlert('Error', 'An error has occurred trying to post the comment');
              });
        }
  });
}

   showAlert( header: string , message: string) {
    this.alertCtrl
        .create({
          header: header,
          message: message,
          buttons: ['Okay']
        })
        .then(alertEl => alertEl.present());
  }

}
