import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Post} from '../../models/post.model';
import {environment} from '../../../environments/environment';
import {NewPostComponent} from '../new-post/new-post.component';
import {PostUserData} from '../../models/postUserData.model';
import {take} from 'rxjs/operators';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {NewCommentComponent} from '../new-comment/new-comment.component';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../../models/user.model';
import {AuthService} from '../../pages/auth/auth.service';
import {PostServiceService} from '../../services/post-service.service';
import {Subscription} from 'rxjs';
import { Plugins } from '@capacitor/core';
import {Router} from '@angular/router';
const { Share } = Plugins;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit, OnDestroy {
  @Input() post: Post;
  serverUrl: string;
  liked: boolean;
  owner: boolean;
  user: User;
  userSub: Subscription;
  constructor(private auth: AuthService,
              private modalCtrl: ModalController,
              private http: HttpClient,
              private alertCtrl: AlertController,
              private postService: PostServiceService,
              private actionSheetCtrl: ActionSheetController,
              private router: Router
  ) { }

  ngOnInit() {
  this.serverUrl = environment.url;
    this.verifyLikeAndOwnership();
}
ngOnDestroy(): void {
    this.userSub.unsubscribe();
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

  verifyLikeAndOwnership() {
    this.userSub = this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.liked = this.post.favoriters.some(id => {
          return id === user.id;
        });
        this.owner = user.id === this.post.user._id;
      } else {
      }
    });
  }

  likeHandler() {
    let urlAction: string;
    if (this.liked) {
      urlAction = `${this.serverUrl}/tweets/${this.post._id}/favorites/unlike`;
    } else {
      urlAction = `${this.serverUrl}/tweets/${this.post._id}/favorites`;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.user.token}`
      })
    };
    const body = new HttpParams()
        .set('tweet', this.post._id);
    this.http.post<any>(urlAction, body.toString(), httpOptions).subscribe(() => {
      this.liked = !this.liked;
      this.postService.fetchPosts().pipe(take(1)).subscribe();
    }, error => {
      this.showAlert('Error', 'An error has occurred trying to like the post');
    });
  }

  deletePostHandler() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.user.token}`
      })
    };
    const body = new HttpParams()
        .set('tweet', this.post._id);
    this.http.delete<any>(`${this.serverUrl}/tweets/${this.post._id}`, httpOptions)
        .subscribe(() => {
          this.postService.fetchPosts().pipe(take(1)).subscribe();
        }, error => {
          this.showAlert('Error', 'An error has occurred while trying to delete the post');
        });
  }

  sharePostHandler() {
    this.actionSheetCtrl.create({
      header: 'Share Post via...',
      buttons: [{
        text: 'WhatsApp',
        icon: 'logo-whatsapp',
        handler: () => { this.shareSocial();}
      },
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => { console.log('wip');}
        },
        {
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => { console.log('wip');}
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  async shareSocial() {
    const shareRet = await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies'
    });
  }
  goToProfile(userId: string) {
    this.router.navigate(['home', 'userProfile', userId]);
  }
}
