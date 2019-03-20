import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
   user: User;
   usersub: Subscription;
   isLoading = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.usersub = this.auth.user.subscribe(user => {
    this.user = user;
    this.isLoading = false;
    });
  }
  ngOnDestroy(): void {
    this.usersub.unsubscribe();
  }

}
