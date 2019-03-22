import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quick-user',
  templateUrl: './quick-user.component.html',
  styleUrls: ['./quick-user.component.scss'],
})
export class QuickUserComponent implements OnInit {
  @Input() user: User;
  constructor(private router: Router) { }

  ngOnInit() {}

  goToProfile() {

    this.router.navigate(['home', 'userProfile', this.user._id]);
  }
}

