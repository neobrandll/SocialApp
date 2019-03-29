import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../pages/auth/auth.service';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-menu-info',
  templateUrl: './user-menu-info.component.html',
  styleUrls: ['./user-menu-info.component.scss'],
})
export class UserMenuInfoComponent implements OnInit, OnDestroy {
 url = environment.url;
 user: User;
 userSub: Subscription;
 isAuth: boolean;
  serverUrl: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
   this.userSub =  this.authService.user.subscribe(userdata => {
     this.user = userdata;
     console.log(this.user);
   });
    this.serverUrl = this.url;
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
