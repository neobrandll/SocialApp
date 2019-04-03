import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../../services/chat.service';
import {UserProfile} from '../../../models/userProfile.model';
import {ChatMessage, ChatPostResponse} from '../../../models/chat.model';
import {TimeInterval} from 'rxjs';

@Component({
  selector: 'app-single-chat',
  templateUrl: './single-chat.page.html',
  styleUrls: ['./single-chat.page.scss'],
})
export class SingleChatPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private chatService: ChatService) { }
mailedUserId: string;
mailedUser: UserProfile;
messageValue: string;
interval;
chat: ChatPostResponse;
messagesArr: ChatMessage[];



  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(paramMap => {
      this.mailedUserId = paramMap.get('mailedUser');
      this.chatService.mailedUser(this.mailedUserId).subscribe(user => {
        this.mailedUser = user;
      });
      this.loadMsgs();
      this.interval = setInterval(() => {
        this.loadMsgs();
      }, 2000);
    });
  }

  ionViewWillLeave() {
    clearInterval(this.interval);
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

  loadMsgs() {
    this.chatService.loadChat(this.mailedUserId).subscribe(chatResponse => {
      if (chatResponse.chat !== null) {
        this.chat = chatResponse;
        this.messagesArr = this.chat.chat.messages;
      }
    });
    }

}
