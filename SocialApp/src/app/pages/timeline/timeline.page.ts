import { Component, OnInit } from '@angular/core';
import {PostServiceService} from '../../services/post-service.service';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  isLoading = false;
  constructor(private postService: PostServiceService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Loading posts...' })
        .then(loadingEl => {
          loadingEl.present();
          this.isLoading = true;
          this.postService.fetchPosts().subscribe(posts => {
            this.isLoading = false;
            loadingEl.dismiss();
            console.log(posts);
          }, () => {
            loadingEl.dismiss();
          });
        });
  }
  newPostHandler() {
  this.postService.newPostModal();
  }
}
