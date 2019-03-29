import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Share, ShareOptions} from '@capacitor/core';
import {Post} from '../../../models/post.model';
import {User} from '../../../models/user.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PostServiceService} from '../../../services/post-service.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {NewCommentComponent} from '../../../components/new-comment/new-comment.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-individual-post',
  templateUrl: './individual-post.component.html',
  styleUrls: ['./individual-post.component.scss'],
})
export class IndividualPostComponent implements OnInit, OnDestroy {
  shareObject: ShareOptions = {};
  @Input() post: Post;
  @Output() postEmitter = new EventEmitter<Post>();
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
                this.postService.fetchPosts().pipe(take(1)).subscribe(posts => {
                  const newPost = posts.filter(post => post._id === this.post._id);
                  this.post = newPost[0];
                  this.postEmitter.emit(newPost[0]);
                });
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
      this.postService.fetchPosts().pipe(take(1)).subscribe(posts => {
        const newPost = posts.filter(post => post._id === this.post._id);
        this.post = newPost[0];
        this.postEmitter.emit(newPost[0]);
      });
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
          this.router.navigate(['home']);
        }, error => {
          this.showAlert('Error', 'An error has occurred while trying to delete the post');
        });
  }

  sharePostHandler() {
    this.shareObject.title = 'test';
    this.shareObject.text = 'test';
    this.shareObject.url = 'test';
    this.shareObject.dialogTitle = 'test';
    this.shareSocial(this.shareObject);
  }

  async shareSocial(shareOptions: ShareOptions) {
    await Share.share({
      title: shareOptions.title,
      text: shareOptions.text,
      url: shareOptions.url,
      dialogTitle: shareOptions.dialogTitle
    });
  }

  goToProfile(userId: string) {
    this.router.navigate(['home', 'userProfile', userId]);
  }
}
