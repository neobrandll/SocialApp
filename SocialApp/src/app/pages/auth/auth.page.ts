import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    form: FormGroup;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl(null, {
                updateOn: 'change',
                validators: [Validators.required]
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
      const username = this.form.value.username;
      const password = this.form.value.password;
      this.authService.login(username, password).subscribe(() => {
          this.router.navigate(['/home']);
      });
     }

     onSwitchAuthMode() {
        this.router.navigate(['/', 'register']);
     }




}
