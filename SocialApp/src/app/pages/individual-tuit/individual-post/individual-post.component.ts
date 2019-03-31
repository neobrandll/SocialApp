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
import {CommentsService} from '../../../services/comments.service';
import {SimpleAlertService} from '../../../services/simple-alert.service';
import {LikesSubscriptionsService} from '../../../services/likes-subscriptions.service';

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
              private router: Router,
              private commentsService: CommentsService,
              private alertService: SimpleAlertService,
              private likesNsubs: LikesSubscriptionsService
  ) { }

  ngOnInit() {
    this.serverUrl = environment.url;
    this.verifyLikeAndOwnership();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  newComment() {
    this.commentsService.newComment(this.post).pipe(take(1)).subscribe(respData => {
      if ( respData.msg === 'Comment added!') {
        this.postService.fetchPosts().pipe(take(1)).subscribe(posts => {
          const newPost = posts.filter(post => post._id === this.post._id);
          this.post = newPost[0];
        });
      }
    }, error => {
      this.alertService.showAlert('Error', 'An error has occurred trying to post the comment');
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
        return;
      }
    });
  }

  likeHandler() {
    this.likesNsubs.likeHandler(this.post._id, this.liked).pipe(take(1)).subscribe(liked => {
      if (liked) {
        this.post.favoritesCount++;
        this.post.favoriters.push(this.user.id);
      } else {
        this.post.favoritesCount--;
        this.post.favoriters = this.post.favoriters.filter(id => id !== this.user.id);
      }
      this.liked = liked;
    });
  }

  deletePostHandler() {
    this.postService.deletePostHandler(this.post._id).subscribe(() => {
     this.router.navigate(['home']);
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
