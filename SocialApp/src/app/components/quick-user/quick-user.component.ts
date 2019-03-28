import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-quick-user',
  templateUrl: './quick-user.component.html',
  styleUrls: ['./quick-user.component.scss'],
})
export class QuickUserComponent implements OnInit {
  @Input() user: any;
  serverUrl: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.serverUrl = environment.url;
  }

  goToProfile() {
    this.router.navigate(['home', 'userProfile', this.user._id]);
  }
}

