import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/user.model';
import {NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {switchMap, take} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserProfile} from '../../models/userProfile.model';
import {Post} from '../../models/post.model';

interface UserResponse {
  user: {
    _id: string;
    email: string;
    username: string;
    name: string;
    following: string[];
    followers: string[];
    profileImage: string
  };
  tweets: string[];
  tweetCount: number;
  followerCount: number;
  followingCount: number;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user: UserProfile;
  myUser: User;
  isLoading = false;
  serverUrl: string;
  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private auth: AuthService,
              private http: HttpClient
              ) { }

  ngOnInit() {
    this.serverUrl = environment.url;
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.isLoading = true;
      this.auth.user.pipe(take(1), switchMap(user => {
        this.myUser = user;
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${this.myUser.token}`
          })
        };
        return this.http.get<UserResponse>(`${this.serverUrl}/users/${paramMap.get('id')}`, httpOptions);
      })).subscribe(userResp => {
        const userUser = {
          _id: userResp.user._id,
        name: userResp.user.name,
        username: userResp.user.username,
        provider: 'local',
        email: userResp.user.email,
        following: userResp.user.following,
        followers: userResp.user.followers,
        profileImage: userResp.user.profileImage};

        this.user = new UserProfile(
            userUser
            , userResp.tweets
            , userResp.tweetCount
            , userResp.followerCount
            , userResp.followingCount);
      });
    });
  }

  onPostDelete(post: Post) {
    this.user.tweets = this.user.tweets.filter(tweet => tweet._id !== post._id);
  }

}
