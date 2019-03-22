import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {PostComponent} from '../components/post/post.component';
import {NewCommentComponent} from '../components/new-comment/new-comment.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserProfileComponentID} from '../components/user-profile/user-profile.componentID';





@NgModule({
    declarations: [ PostComponent, NewCommentComponent, UserProfileComponentID],
    imports: [CommonModule, IonicModule, ReactiveFormsModule],
    exports: [ PostComponent, NewCommentComponent, UserProfileComponentID],
    entryComponents: [NewCommentComponent]
})
export class SharedModule {}
