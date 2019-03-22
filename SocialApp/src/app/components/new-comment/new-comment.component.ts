import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post.model';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController} from '@ionic/angular';
import {take} from 'rxjs/operators';
import {AuthService} from '../../pages/auth/auth.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  @Input() post: Post;
  url: string;
  user: User;
  form: FormGroup;
  isloading = false;
  constructor(private modalCtrl: ModalController, private loadingCtrl: LoadingController, private auth: AuthService) {
  }

  ngOnInit() {
    this.url = environment.url;
    this.isloading = true;
    this.loadingCtrl
        .create({ keyboardClose: true, message: 'Loading...' })
        .then(loadingEl => {
          loadingEl.present();
          this.auth.user.pipe(take(1)).subscribe(user => {
            this.user = user;
            this.form = new FormGroup({
              commentText: new FormControl(null, {
                updateOn: 'change',
                validators: [ Validators.required, Validators.minLength(1), Validators.maxLength(140)]
              })
            });
            this.isloading = false;
            loadingEl.dismiss();
          }, error => {
            loadingEl.dismiss();
            console.log(error);
            this.isloading = false;
          });
        });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const text = this.form.value.commentText;
      this.modalCtrl.dismiss({ comment: text }, 'confirm');
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
