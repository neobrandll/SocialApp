import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth/auth.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  inputValue: string;
  serverUrl: string;
  userArray = [];
  constructor(private http: HttpClient, private auth: AuthService) { }


  searchHandler() {
    console.log(this.inputValue);
    this.auth.token.pipe(take(1)).subscribe(token =>{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`
        })
      };
      const body = new HttpParams()
          .set('search', this.inputValue);
      this.http.post<any>(`${this.serverUrl}/users/search`, body.toString(), httpOptions ).subscribe( userArr => {
        this.userArray = userArr;
      });
    });
  }
  ngOnInit() {
    this.serverUrl = environment.url;

  }

}
