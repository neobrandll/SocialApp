import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../../services/chat.service';
import {UserProfile} from '../../../models/userProfile.model';
import {ChatMessage, ChatPostResponse} from '../../../models/chat.model';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.page.html',
  styleUrls: ['./single-chat.page.scss'],
})
export class SingleChatPage implements OnInit {
mailedUserId: string;
mailedUser: UserProfile;
messageValue: string;
chat: ChatPostResponse;
messagesArr: ChatMessage[];

  constructor(private route: ActivatedRoute,
              private chatService: ChatService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.route.paramMap.subscribe(paramMap => {
      this.mailedUserId = paramMap.get('mailedUser');
      this.chatService.mailedUser(this.mailedUserId).subscribe(user => {
        this.mailedUser = user;
      });
      this.chatService.loadChat(this.mailedUserId).subscribe(chatResponse => {
        if (chatResponse.chat !== null) {
          this.chat = chatResponse;
          this.messagesArr = this.chat.chat.messages;
        }
      });
    });
  }

  sendMsg() {
    if (this.mailedUserId.trim() === '') {
      return;
    }
    this.chatService.sendMsg(this.mailedUserId.trim(), this.messageValue).subscribe(responseData => {
      this.messageValue = '';
      this.chat = responseData;
      this.messagesArr = this.chat.chat.messages;
    });
  }

}
