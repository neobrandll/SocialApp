import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {environment} from '../../../environments/environment';
import {switchMap, take, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../../models/post.model';
import {AuthService} from '../../pages/auth/auth.service';



@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
 user: User;
 form: FormGroup;
 isloading = false;
  serverUrl: string;
  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private auth: AuthService,
              private http: HttpClient,
              private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
      this.serverUrl = environment.url;
      this.isloading = true;
      this.loadingCtrl
          .create({ keyboardClose: true, message: 'Loading...' })
          .then(loadingEl => {
              loadingEl.present();
              this.auth.user.pipe(take(1)).subscribe(user => {
                  this.user = user;
                  this.form = new FormGroup({
                      postText: new FormControl(null, {
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

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const text = this.form.value.postText;
    this.newPost(text).subscribe((data) => {
      this.modalCtrl.dismiss({ post: data }, 'confirm');
    }, error => {
      console.log(error);
    });
  }


  newPost(text: string, image?: any) {
    const formData = new FormData();
    formData.append('body', text);
    if (image) {
      formData.append('image', image);
    }
    return this.auth.token.pipe(take(1), switchMap(token => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
      return this.http.post<Post>(`${this.serverUrl}/tweets`, formData , httpOptions);
    } ) );
  }



  private showAlert( header: string , message: string) {
    this.alertCtrl
        .create({
          header: header,
          message: message,
          buttons: ['okay']
        })
        .then(alertEl => alertEl.present());
  }


}
