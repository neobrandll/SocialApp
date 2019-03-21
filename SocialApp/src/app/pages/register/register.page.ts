import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AlertController, LoadingController} from '@ionic/angular';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 form: FormGroup;
 pwdMatch = false;
 url = environment.url;
  constructor(
                private router: Router
              , private http: HttpClient
              , private  alertCtrl: AlertController,
                private loadingCtrl: LoadingController
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

      this.loadingCtrl
          .create({ keyboardClose: true, message: 'Logging in...' })
          .then(loadingEl => {
              loadingEl.present();
    const body = new HttpParams()
          .set('email', email)
          .set('password', password)
          .set('username', username)
          .set('name', name)
          .set('provider', 'local');
      const serverUrl = this.url;
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded'
          }),
      };
       this.http.post<any>(`${serverUrl}/signup`, body.toString() , httpOptions )
           .subscribe(() => {
                   loadingEl.dismiss();
                   this.showAlert('Register', `Register complete!`, true );
           }, error => {
                   loadingEl.dismiss();
                   this.showAlert('Error', error.error.error.errmsg, false );
       });
          });
  }

    private showAlert( header: string , message: string, complete: boolean) {
        this.alertCtrl
            .create({
                header: header,
                message: message,
                buttons: [
                        {
                            text: 'Okay',
                            handler: () => {
                                if (complete) {
                                    this.form.reset();
                                    this.router.navigate(['/auth']);
                                }
                            }
                        }
                    ]
            })
            .then(alertEl => alertEl.present());
    }
}
