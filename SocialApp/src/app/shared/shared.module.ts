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




@NgModule({
    declarations: [PostComponent
        , NewCommentComponent
        , UserProfileComponentID
        , CommentComponent
        , QuickUserComponent
        , ImagePickerComponent
        ,  UserMenuInfoComponent
    ],
    imports: [CommonModule, IonicModule, ReactiveFormsModule],
    exports: [ PostComponent
        , NewCommentComponent
        , UserProfileComponentID
        , CommentComponent
        , QuickUserComponent
        , ImagePickerComponent
        , UserMenuInfoComponent],
    entryComponents: [NewCommentComponent]
})
export class SharedModule {}
