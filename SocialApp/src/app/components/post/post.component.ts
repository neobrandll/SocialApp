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
import { Plugins, ShareOptions } from '@capacitor/core';
import {Router} from '@angular/router';
import {CommentsService} from '../../services/comments.service';
import {SimpleAlertService} from '../../services/simple-alert.service';
import {LikesSubscriptionsService} from '../../services/likes-subscriptions.service';
const { Share } = Plugins;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit, OnDestroy {
  shareObject: ShareOptions = {};
  @Input() post: Post;
  serverUrl: string;
  shareUrl = environment.shareUrl;
  liked: boolean;
  owner: boolean;
  user: User;
  userSub: Subscription;
  createdDate: Date;
  commentsCount: number;
  constructor(private auth: AuthService,
              private modalCtrl: ModalController,
              private http: HttpClient,
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
    this.createdDate = new Date(this.post.createdAt);
    this.commentsCount = this.post.comments.length;

}
ngOnDestroy(): void {
    this.userSub.unsubscribe();
}


  newComment() {
    this.commentsService.newComment(this.post).pipe(take(1)).subscribe(respData => {
      if ( respData.msg === 'Comment added!') {
        this.commentsCount++;
        // this.postService.fetchPosts().pipe(take(1)).subscribe(posts => {
        //   const newPost = posts.filter(post => post._id === this.post._id);
        //   this.post = newPost[0];
        // });
      }
    }, error => {
      this.alertService.showAlert('Error', 'An error has occurred trying to post the comment');
    });
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
    this.postService.deletePostHandler(this.post._id).subscribe();
  }

  sharePostHandler() {
    this.shareObject.title = `test`;
    this.shareObject.text = `Check out @${this.post.user.username}'s Post:`;
    this.shareObject.url = `${this.shareUrl}/home/tweet/${this.post.user._id}/${this.post._id}`;
    this.shareObject.dialogTitle = 'Share the post!';
    this.postService.shareSocial(this.shareObject);
  }

}
