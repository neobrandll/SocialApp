import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {User} from '../../models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {environment} from '../../../environments/environment';

interface UserData {
    user: {
        _id: string,
        email: string,
        name: string,
        username: string,
        token: string,
        following: string[],
        followers: string[],
        profileImage: string
    };
}



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
 user: User;
 form: FormGroup;
 isLoading: boolean;
 serverUrl: string;
  constructor(private auth: AuthService,
              private http: HttpClient,
              private router: Router,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController
              ) { }



  ngOnInit(): void{
      this.serverUrl = environment.url;
    this.isLoading = true;
    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging in...' })
        .then(loadingEl => {
          loadingEl.present();
          this.auth.user.pipe(take(1)).subscribe(user => {
            this.user = user;
            this.form = new FormGroup({
              username: new FormControl(this.user.username , {
                updateOn: 'change',
                validators: [Validators.required]
              }),
              name: new FormControl(this.user.name, {
                updateOn: 'change',
                validators: [Validators.required]
              }),
              email: new FormControl(this.user.email, {
                updateOn: 'change',
                validators: [Validators.required, Validators.email]
              })
            });
            this.isLoading = false;
            loadingEl.dismiss();
          });
        });
  }

    onSubmit() {
      const newName = this.form.value.name;
      const newUsername = this.form.value.username;
      const newEmail = this.form.value.email;
      this.auth.token.pipe(take(1)).subscribe(token => {
          const httpOptions = {
              headers: new HttpHeaders({
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': `Bearer ${token}`
              })
          };
          const body = new HttpParams()
              .set('name', newName)
              .set('username', newUsername)
              .set('email', newEmail);
          this.http.put<UserData>(`${this.serverUrl}/users`, body.toString(), httpOptions)
              .subscribe(updateResp => {
                  const updatedUser = new User(
                      updateResp.user.token
                      , updateResp.user._id
                      , updateResp.user.email
                      , updateResp.user.name
                      , updateResp.user.username
                      , updateResp.user.followers
                      , updateResp.user.following
                      , updateResp.user.profileImage);
                  this.auth.updateUser(updatedUser);
                  this.showAlert('Success!', 'Update Complete!');
              });
      });
    }

    private showAlert( header: string , message: string) {
        this.alertCtrl
            .create({
                header: header,
                message: message,
                buttons: [
                    {
                        text: 'Okay',
                        handler: () => {
                                this.router.navigate(['/home']);
                            }
                        }
                ]
            })
            .then(alertEl => alertEl.present());
    }
}
