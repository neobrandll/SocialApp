import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {PostComponent} from '../components/post/post.component';
import {NewCommentComponent} from '../components/new-comment/new-comment.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserProfileComponentID} from '../components/user-profile/user-profile.componentID';
import {CommentComponent} from '../components/comment/comment.component';



@NgModule({
    declarations: [ PostComponent, NewCommentComponent, UserProfileComponentID, CommentComponent
    ],
    imports: [CommonModule, IonicModule, ReactiveFormsModule],
    exports: [ PostComponent, NewCommentComponent, UserProfileComponentID, CommentComponent],
    entryComponents: [NewCommentComponent]
})
export class SharedModule {}
