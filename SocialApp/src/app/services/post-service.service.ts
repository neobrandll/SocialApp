import { Injectable } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NewPostComponent} from '../components/new-post/new-post.component';
import {Keyboard} from '@ionic-native/keyboard/ngx';


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private modalCtrl: ModalController, private keyboard: Keyboard) { }

  newPostModal() {
  this.modalCtrl.create({component: NewPostComponent, componentProps: {}})
      .then(modalEl =>{
        modalEl.present();
        this.keyboard.show();
        console.log(this.keyboard.isVisible);
      });
  }
}
