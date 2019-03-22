import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserProfile} from '../../models/userProfile.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-user-profileID',
  templateUrl: './user-profile.componentID.html',
  styleUrls: ['./user-profile.componentID.scss'],
})
export class UserProfileComponentID implements OnInit {
  @Input() userData: UserProfile;
  user: User;
  serverUrl: string;
  constructor() { }

  ngOnInit() {
    this.serverUrl = environment.url;
    this.user = this.userData.user;
  }

}
