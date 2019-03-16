import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLogin = true;
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
      this.authService.login();
      this.router.navigate(['/home']);
     }
     onSubmit() {
        if (!this.form.valid) {
            return;
        }
        const email = this.form.value.email;
        const password = this.form.value.password;
        if (this.isLogin) {
            // login
        } else {
            // register
        }
     }

     onSwitchAuthMode() {
        this.router.navigate(['/', 'register']);
     }



}
