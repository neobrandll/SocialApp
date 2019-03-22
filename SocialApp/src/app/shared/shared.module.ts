import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {PostComponent} from '../components/post/post.component';
import {NewCommentComponent} from '../components/new-comment/new-comment.component';
import {ReactiveFormsModule} from '@angular/forms';




@NgModule({
    declarations: [ PostComponent, NewCommentComponent],
    imports: [CommonModule, IonicModule, ReactiveFormsModule],
    exports: [ PostComponent, NewCommentComponent],
    entryComponents: [NewCommentComponent]
})
export class SharedModule {}
