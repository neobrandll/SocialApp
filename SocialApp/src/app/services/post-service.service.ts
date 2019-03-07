import { Injectable } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NewPostComponent} from '../components/new-post/new-post.component';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private modalCtrl: ModalController) { }

  newPostModal() {
  this.modalCtrl.create({component: NewPostComponent, componentProps: {}})
      .then(modalEl =>{
        modalEl.present();
      });
  }
}
