import { Component, OnInit } from '@angular/core';
import {PostServiceService} from '../../services/post-service.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {

  constructor(private postService: PostServiceService) { }

  ngOnInit() {
  }
  newPostHandler() {
  this.postService.newPostModal();
  }
}
