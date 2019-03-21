import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {environment} from '../../../environments/environment';



@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
 form: FormGroup;
  @Input() user: User;
  serverUrl: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.serverUrl = environment.url;
    this.form = new FormGroup({
      postText: new FormControl(null, {
        updateOn: 'change',
        validators: [ Validators.required, Validators.minLength(1), Validators.maxLength(140)]
      })
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
