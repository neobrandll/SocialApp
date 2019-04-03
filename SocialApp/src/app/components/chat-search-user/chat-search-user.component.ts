import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-chat-search-user',
  templateUrl: './chat-search-user.component.html',
  styleUrls: ['./chat-search-user.component.scss'],
})
export class ChatSearchUserComponent implements OnInit {
  @Input() user: any;
  serverUrl: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.serverUrl = environment.url;
  }

}
