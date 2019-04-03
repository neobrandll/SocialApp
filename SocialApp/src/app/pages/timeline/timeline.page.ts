import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostServiceService} from '../../services/post-service.service';
import {LoadingController} from '@ionic/angular';
import {Post} from '../../models/post.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit, OnDestroy {
  isLoading = false;
  postArr: Post[];
  postSub: Subscription;
  constructor(private postService: PostServiceService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
      this.loadPosts();
  }
  newPostHandler() {
  this.postService.newPostModal();
  }
  ngOnDestroy(): void {
      this.postSub.unsubscribe();
  }

    doRefresh(event) {
        this.isLoading = true;
        this.postSub = this.postService.fetchPosts().subscribe(posts => {
            this.postArr = posts;
            this.isLoading = false;
            event.target.complete();
        }, () => {
        });
    }

    loadPosts() {
        this.loadingCtrl
            .create({ keyboardClose: true, message: 'Loading posts...' })
            .then(loadingEl => {
                loadingEl.present();
                this.isLoading = true;
                this.postSub = this.postService.fetchPosts().subscribe(posts => {
                    this.isLoading = false;
                    loadingEl.dismiss();
                    this.postArr = posts;
                }, () => {
                    loadingEl.dismiss();
                });
            });
    }
}
