import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from '../../config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {User} from '../../models/user.model';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  user: User;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private router: Router, private config: ConfigService, private http: HttpClient,  private alertController: AlertController) { }

  login(username: string, password: string) {
    const body = JSON.stringify({password: password, username: username});
    const serverUrl = this.config.url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<{message: string; token: string; status: number}>(`${serverUrl}/session/login`, body , httpOptions).
    pipe(tap(data => {
      if (data.status === 200){
        this._userIsAuthenticated = true;
        this.user.token = data.token;
      } else {
        this.errorAlert();
      }

    }));

  }

  logout() {
    this._userIsAuthenticated = false;
  }
  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'An error ocurred',
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
        }
      }]
    });

    await alert.present();
  }
}

