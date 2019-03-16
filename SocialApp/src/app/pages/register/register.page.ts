import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 form: FormGroup;
 pwdMatch = false;
  constructor(private router: Router) { }

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
      lastname: new FormControl(null, {
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
    this.onSwitchToLogin();
  }
}
