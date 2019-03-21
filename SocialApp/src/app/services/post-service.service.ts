import {Injectable} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {NewPostComponent} from '../components/new-post/new-post.component';
import {BehaviorSubject} from 'rxjs';
import {Post} from '../models/post.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AuthService} from '../pages/auth/auth.service';
import {PostUserData} from '../models/postUserData.model';




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
        return this.auth.token.pipe(take(1), switchMap(token => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                })
            };
            return this.http.get<{title: string, tweets: Post[]}>(`${this.url}/tweets`, httpOptions );
        } ), map(resData => {
            const posts = [];
            for (const tuit of resData.tweets) {
                posts.push(new Post(tuit.favoritesCount,
                    new PostUserData(tuit.user._id,
                        tuit.user.name,
                        tuit.user.username,
                        tuit.user.profileImage),
                    tuit._id,
                    tuit.createdAt,
                    tuit.favoriters,
                    tuit.favorites,
                    tuit.image,
                    tuit.comments,
                    tuit.body));
            }
            return posts;
        }), tap(posts => {
            this._posts.next(posts);
        }) );
    }

  constructor(private modalCtrl: ModalController,
              private http: HttpClient,
              private alertCtrl: AlertController,
              private auth: AuthService
  ) { }

  newPostModal() {
      let newPost: Post;
        this.auth.user.pipe(take(1)).subscribe(user => {
            this.modalCtrl.create({component: NewPostComponent, componentProps: {user: user}})
                .then(modalEl => {
                    modalEl.present();
                    return modalEl.onDidDismiss();
                }).then(resultData => {
                    if (resultData.role === 'confirm') {
                        const tuit = resultData.data.post.tweet;
                         newPost = new Post(tuit.favoritesCount,
                            new PostUserData(tuit.user.id,
                                tuit.user.name,
                                tuit.user.username,
                                tuit.user.profileImage),
                            tuit.id,
                            tuit.createdAt,
                            tuit.favoriters,
                            tuit.favorites,
                            tuit.image,
                            tuit.comments,
                            tuit.body);
                    }
                    this.post.pipe(take(1)).subscribe(posts => {
                       this._posts.next(posts.concat(newPost));
                    });
            });
        });
  }






}
