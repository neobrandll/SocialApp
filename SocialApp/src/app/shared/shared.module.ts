import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {PostComponent} from '../components/post/post.component';
import {NewCommentComponent} from '../components/new-comment/new-comment.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserProfileComponentID} from '../components/user-profile/user-profile.componentID';
import {CommentComponent} from '../components/comment/comment.component';
import {QuickUserComponent} from '../components/quick-user/quick-user.component';
import {ImagePickerComponent} from '../components/image-picker/image-picker.component';
import {UserMenuInfoComponent} from '../components/user-menu-info/user-menu-info.component';
import {IndividualPostComponent} from '../pages/individual-tuit/individual-post/individual-post.component';
import {UserPostComponent} from '../pages/user-profile/user-post/user-post.component';
import {RouterModule} from '@angular/router';




@NgModule({
    declarations: [PostComponent
        , NewCommentComponent
        , UserProfileComponentID
        , CommentComponent
        , QuickUserComponent
        , ImagePickerComponent
        ,  UserMenuInfoComponent
        , IndividualPostComponent
        , UserPostComponent
    ],
    imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule],
    exports: [ PostComponent
        , NewCommentComponent
        , UserProfileComponentID
        , CommentComponent
        , QuickUserComponent
        , ImagePickerComponent
        , UserMenuInfoComponent
        , IndividualPostComponent
         , UserPostComponent],
    entryComponents: [NewCommentComponent]
})
export class SharedModule {}
