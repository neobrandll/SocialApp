import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PostServiceService} from '../../services/post-service.service';
import {Post} from '../../models/post.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-individual-tuit',
  templateUrl: './individual-tuit.page.html',
  styleUrls: ['./individual-tuit.page.scss'],
})
export class IndividualTuitPage implements OnInit{
serverUrl: string;
post: Post;
postId: string;
postOwnerId: string;

  constructor(private postService: PostServiceService,
              private auth: AuthService,
              private http: HttpClient,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.serverUrl = environment.url;
    // this.postService.individualPost.pipe(take(1)).subscribe(post => {
    //       this.post = post;
    //     }
    // );
    this.route.paramMap.subscribe(paramMap => {
      this.postOwnerId = paramMap.get('userId');
      this.postId = paramMap.get('postId');
      this.postService.individualPost(this.postOwnerId, this.postId).subscribe( post => {
        this.post = post[0];
      });
    });
  }

  newPost(post: Post) {
    this.post = post;
  }
}
