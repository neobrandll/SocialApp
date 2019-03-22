import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../models/comment.model';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  serverUrl: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.serverUrl = environment.url;
  }

  goToProfile(userId: string) {
    this.router.navigate(['home', 'userProfile', userId]);
  }

}
