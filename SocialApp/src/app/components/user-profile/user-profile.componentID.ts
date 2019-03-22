import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserProfile} from '../../models/userProfile.model';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertController} from '@ionic/angular';

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
              , private alertCtrl: AlertController) { }

  ngOnInit() {
    this.serverUrl = environment.url;
    this.user = this.userData.user;
    this.owner = this.myUser.id === this.user.id;
    this.following = this.userData.user.followers.some(id => {
      return id === this.myUser.id;
    });
  }

  subscriptionHandler() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.myUser.token}`
      })
    };
    if (this.following) {
      this.http.delete<any>(`${this.serverUrl}/users/${this.user.id}/follow`, httpOptions).subscribe(() => {
        this.following = !this.following;
        this.userData.followerCount--;
      }, error => {
        this.showAlert('Error', error);
      });
    } else {
      this.http.post<any>(`${this.serverUrl}/users/${this.user.id}/follow`, null , httpOptions).subscribe(() => {
        this.following = !this.following;
        this.userData.followerCount++;
      }, error => {
        this.showAlert('Error', error);
      });
    }
  }

  showAlert( header: string , message: string) {
    this.alertCtrl
        .create({
          header: header,
          message: message,
          buttons: ['Okay']
        })
        .then(alertEl => alertEl.present());
  }

}
