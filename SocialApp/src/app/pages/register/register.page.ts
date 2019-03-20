import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 form: FormGroup;
 pwdMatch = false;
  constructor(
                private router: Router
              , private http: HttpClient
              , private config: ConfigService
              , private  alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(4)]
      }),
      passwordConfirm: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(4)]
      })
    }, this.passwordMatchValidator);
  }



  passwordMatchValidator = (g: FormGroup) => {
     if (g.get('password').value === g.get('passwordConfirm').value) {
       this.pwdMatch = true;
      return null;
    } else {
       this.pwdMatch = false;
       return {'mismatch': true};
     }
  }


  onSwitchToLogin() {
    this.router.navigate(['/', 'auth']);
  }

  onRegister() {
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;
    const username = this.form.value.username;
    const name = this.form.value.name;
    const body = new HttpParams()
          .set('email', email)
          .set('password', password)
          .set('username', username)
          .set('name', name);
      const serverUrl = this.config.url;
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded'
          }),
      };
       this.http.post<any>(`${serverUrl}/signup`, body.toString() , httpOptions )
           .subscribe(() => {
               this.alertCtrl
                   .create({
                       header: 'Register',
                       message: `Register complete!`,
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
           }, error => {
                   this.alertCtrl
                       .create({
                           header: 'Error',
                           message: `${error.error.error.errmsg}`,
                           buttons: [
                               {
                                   text: 'Okay',
                                   handler: () => {
                                       this.router.navigate(['/register']);
                                   }
                               }
                           ]
                       })
                       .then(alertEl => {
                           alertEl.present();
                       });
       });
  }
}
