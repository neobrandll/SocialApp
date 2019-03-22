import { Component, OnInit, Input } from '@angular/core';
import {Post} from '../../models/post.model';
import {environment} from '../../../environments/environment';
import {NewPostComponent} from '../new-post/new-post.component';
import {PostUserData} from '../../models/postUserData.model';
import {take} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import {NewCommentComponent} from '../new-comment/new-comment.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})

export class PostComponent implements OnInit {
  @Input() post: Post;
  serverUrl: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  this.serverUrl = environment.url;
}

newComment() {
  this.modalCtrl.create({component: NewCommentComponent, componentProps: {post: this.post}})
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      }).then(resultData => {
        console.log(resultData);
  });
}
}
