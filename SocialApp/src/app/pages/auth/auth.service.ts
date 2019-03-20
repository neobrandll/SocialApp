import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from '../../config.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {User} from '../../models/user.model';
import {AlertController} from '@ionic/angular';
import {BehaviorSubject} from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _user = new BehaviorSubject<User>(null);

  get user() {
    return this._user.asObservable();
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private router: Router
              , private config: ConfigService
              , private http: HttpClient
              , private alertCtrl: AlertController
              ) { }

  login = (email: string, password: string) => {
    const body = new HttpParams()
        .set('email', email)
        .set('password', password);
    const serverUrl = this.config.url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      }),
    };
    return this.http.post<UserData>(`${serverUrl}/login`, body.toString() , httpOptions ).
    pipe(tap(data => {
      if (data.user) {
        const newUser = new User(
              data.user.token
            , data.user._id
            , data.user.email
            , data.user.name
            , data.user.username
            , data.user.followers
            , data.user.following
            , data.user.profileImage
        );
        console.log(newUser);
        this._user.next(newUser);
        this._userIsAuthenticated = true;
      }
    },
        errorData => {
          this.alertCtrl
              .create({
                header: 'An error occurred!',
                message: `${errorData.error.error}!`,
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/auth']);
                    }
                  }
                ]
              })
              .then(alertEl => {
                alertEl.present();
              });
        }
    ));

  }

  logout() {
    // const serverUrl = this.config.url;
    // if (this.user.token) {
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/json',
    //       'Authorization': this.user.token
    //     })
    //   };
    //   return this.http.get<{message: string; status: number}>(`${serverUrl}/session/logout`, httpOptions)
    //       .pipe(tap(response => {
    //         if (response.status === 200) {
    //           this._userIsAuthenticated = false;
    //         } else {
    //           this.errorAlert();
    //         }
    //   }));
    // }

  }




}

