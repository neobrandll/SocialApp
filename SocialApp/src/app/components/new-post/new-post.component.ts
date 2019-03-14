import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {Vibration} from '@ionic-native/vibration/ngx';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private keyboard: Keyboard, private vibration: Vibration) { }

  ngOnInit() {
    this.keyboard.show();
    this.vibration.vibrate([2000, 1000, 2000]);
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
