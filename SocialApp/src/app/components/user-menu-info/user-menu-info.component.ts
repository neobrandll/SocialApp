import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../pages/auth/auth.service';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {ConfigService} from '../../config.service';

@Component({
  selector: 'app-user-menu-info',
  templateUrl: './user-menu-info.component.html',
  styleUrls: ['./user-menu-info.component.scss'],
})
export class UserMenuInfoComponent implements OnInit, OnDestroy {
 user: User;
 userSub: Subscription;
 isAuth: boolean;
  serverUrl: string;
  constructor(private authService: AuthService, private config: ConfigService ) { }

  ngOnInit() {
   this.userSub =  this.authService.user.subscribe(userdata => {
     this.user = userdata;
   });
    this.serverUrl = this.config.url;
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
