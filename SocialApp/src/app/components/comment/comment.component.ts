import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Comment} from '../../models/comment.model';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../pages/auth/auth.service';
import {User} from '../../models/user.model';
import {CommentsService} from '../../services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comment: Comment;
  @Input() postId: string;
  serverUrl: string;
  userSub: Subscription;
  user: User;
  owner: boolean;
  constructor(private router: Router, private auth: AuthService, private commentService: CommentsService) { }

  ngOnInit() {
    this.serverUrl = environment.url;
    this.verifyOwnership();
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
  this.commentService.deleteComment(this.postId, this.comment._id).subscribe((data) => {
    console.log(data);
  });

  }
}
