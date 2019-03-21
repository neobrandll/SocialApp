import { Component, OnInit, Input } from '@angular/core';
import {Post} from '../../models/post.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit {
  @Input() post: Post;
  serverUrl: string;
  constructor() { }

  ngOnInit() {
  this.serverUrl = environment.url;
}

print() {
    console.log(this.post);
}
}
