import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    form: FormGroup;


  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'change',
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl(null,{
                validators: [Validators.required, Validators.minLength(4)]
            })
        });
  }
     onLogin() {
      if (!this.form.valid) {
             return;
       }
         const email = this.form.value.email;
         const password = this.form.value.password;
         this.loadingCtrl
             .create({ keyboardClose: true, message: 'Logging in...' })
             .then(loadingEl => {
                 loadingEl.present();
                 this.authService.login(email, password).subscribe(() => {
                     loadingEl.dismiss();
                     this.form.reset();
                     this.router.navigate(['/home']);
                 }, () => {
                     loadingEl.dismiss();
                 });
             });

     }

     onSwitchAuthMode() {
        this.router.navigate(['/', 'register']);
     }




}
