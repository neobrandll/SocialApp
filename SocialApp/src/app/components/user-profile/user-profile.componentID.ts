import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserProfile} from '../../models/userProfile.model';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {LikesSubscriptionsService} from '../../services/likes-subscriptions.service';
import {AuthService} from '../../pages/auth/auth.service';

@Component({
  selector: 'app-user-profileID',
  templateUrl: './user-profile.componentID.html',
  styleUrls: ['./user-profile.componentID.scss'],
})
export class UserProfileComponentID implements OnInit {
  @Input() userData: UserProfile;
  @Input() myUser: User;
  owner: boolean;
  following: boolean;
  user: User;
  serverUrl: string;
  constructor(private http: HttpClient
              , private alertCtrl: AlertController
              , private  likesNsubs: LikesSubscriptionsService
              , private  auth: AuthService) { }

  ngOnInit() {
    this.serverUrl = environment.url;
    this.user = this.userData.user;
    this.owner = this.myUser.id === this.user.id;
    this.following = this.userData.user.followers.some(id => {
      return id === this.myUser.id;
    });
  }

  subscriptionHandler() {
    this.likesNsubs.subscriptionHandler(this.user.id, this.following).subscribe(() => {
      if (this.following) {
        this.following = !this.following;
        this.userData.followerCount--;
        this.myUser.following = this.myUser.following.filter(usersId => usersId !== this.user.id);
        this.auth.updateUser(this.myUser);
      } else {
        this.following = !this.following;
        this.userData.followerCount++;
        this.myUser.following = this.myUser.following.concat(this.user.id);
        this.auth.updateUser(this.myUser);
      }
    });
  }



}
