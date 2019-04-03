import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {take} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {DiscoverService} from '../../../services/discover.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
})
export class NewChatPage implements OnInit {
  inputValue: string;
  serverUrl: string;
  userArray = [];
  alreadySearched = false;
  constructor(private http: HttpClient, private auth: AuthService,
              private discoverService: DiscoverService) { }


  searchHandler() {
    const searchValue = this.inputValue.trim();
    if (searchValue !== '') {
      this.discoverService.searchUser(searchValue).subscribe( userArr => {
        this.userArray = userArr;
        this.alreadySearched = true;
      });
    } else {
      this.userArray = [];
    }
  }

  ngOnInit() {
    this.serverUrl = environment.url;
  }
}
