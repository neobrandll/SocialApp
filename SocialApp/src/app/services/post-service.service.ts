import {Injectable, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {NewPostComponent} from '../components/new-post/new-post.component';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {BehaviorSubject} from 'rxjs';
import {Post} from '../models/post.model';
import {HttpClient} from '@angular/common/http';
import {switchMap, take, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';


interface ResponsePost {
    status: number;
    message: string;
    data: Post[];
}

@Injectable({
  providedIn: 'root'
})
export class PostServiceService  {
    private _posts = new BehaviorSubject<Post[]>([]);
    url = environment.url;

    get post() {
        return this._posts.asObservable();
    }

    fetchPosts() {
        return this.http.get<ResponsePost>(`${this.url}/posts/getPosts` ).pipe(tap(response => {
            if (response.status === 200) {
                this._posts.next(response.data);
            } else {
                this.errorAlert();
            }
        }));
    }

    addPost (text: string , img? ) {

        const url = this.url;
        let urlAction: string;
        let content;
        if (img) {
            urlAction = '/posts/createImagePost/post';
            content = {text, img};
        } else {
            urlAction = '/posts/createPost';
            content = {text};
        }
        return this.http
            .post<{ status: number, name: string }>(
                `${url}${urlAction}`, content);
    }

  constructor(private modalCtrl: ModalController,
              private keyboard: Keyboard,
              private http: HttpClient,
              private alertController: AlertController) { }

  newPostModal() {
  this.modalCtrl.create({component: NewPostComponent, componentProps: {}})
      .then(modalEl => {
        modalEl.present();
        this.keyboard.show();
        console.log(this.keyboard.isVisible);
      });
  }



    async errorAlert() {
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'An error ocurred',
            buttons: [{
                text: 'Ok',
                handler: () => {
                    alert.dismiss();
                }
            }]
        });

        await alert.present();
    }
}
