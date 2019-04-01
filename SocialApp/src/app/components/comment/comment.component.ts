import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Comment} from '../../models/comment.model';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../pages/auth/auth.service';
import {User} from '../../models/user.model';
import {CommentsService} from '../../services/comments.service';
import {PostServiceService} from '../../services/post-service.service';
import {Post} from '../../models/post.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comment: Comment;
  @Input() post: Post;
  @Output() postEmitter = new EventEmitter<Post>();
  serverUrl: string;
  userSub: Subscription;
  user: User;
  owner: boolean;
  createdDate: Date;
  constructor(private router: Router, private auth: AuthService, private commentService: CommentsService
              , private postService: PostServiceService ) { }

  ngOnInit() {
    this.serverUrl = environment.url;
    this.verifyOwnership();
    this.createdDate = new Date(this.comment.createdAt);
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  goToProfile(userId: string) {
    this.router.navigate(['home', 'userProfile', userId]);
  }

  verifyOwnership() {
    this.userSub = this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.owner = user.id === this.comment.user._id;
      }
    });
  }

  onDeleteHandler() {
  this.commentService.deleteComment(this.post._id, this.comment._id).subscribe(() => {
    this.postService.fetchPosts().subscribe();
    this.post.comments = this.post.comments.filter(comment => comment._id !== this.comment._id);
    this.postEmitter.emit(this.post);
  }, error => {
    console.log('An error has ocurred', error);
  });

  }
}
