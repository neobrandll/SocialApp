import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit {
    post: Post;
  constructor() { }

  ngOnInit() {}

}
