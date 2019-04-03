import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../../models/chat.model';
import {UserProfile} from '../../models/userProfile.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
  @Input() message: ChatMessage;
  @Input() mailedUser: UserProfile;
  serverUrl: string;
  isFromMailedUser = false;
  constructor() { }

  ngOnInit() {
    this.serverUrl = environment.url;
    if (this.message.sentBy === this.mailedUser.user._id){
      this.isFromMailedUser = true;
    }
    console.log(this.isFromMailedUser, this.message.message);
  }

}
