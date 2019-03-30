import { Component, OnInit } from '@angular/core';
import {FollowsResponse} from '../../models/Follows-response.model';
import {ActivatedRoute} from '@angular/router';
import {FollowsPagesService} from '../../services/follows-pages.service';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.page.html',
  styleUrls: ['./follows.page.scss'],
})
export class FollowsPage implements OnInit {
  userId: string;
  followType: string;
  followsResponse: FollowsResponse;
  constructor(private route: ActivatedRoute,
              private followsService: FollowsPagesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('userId');
      this.followType = paramMap.get('followType');
      this.followsService.getFollows(this.userId, this.followType).subscribe(followsResponse => {
        this.followsResponse = followsResponse;
      });
    });
  }
}
