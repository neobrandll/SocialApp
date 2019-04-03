import {UserProfileUser} from './userProfile.model';

export interface ChatPostResponse {
    chat: {
        user1: string;
        user2: string;
        _id: string
        createdAt: string;
        messages: ChatMessage[]
    };
}

export interface ChatMessage {
    type: string;
    sentBy: string;
    _id: string;
    sentAt: string;
    message: string;
}

export interface Chats {
    _id: string;
    user1: UserProfileUser;
    user2: string;
    createdAt: string;
    messages: ChatMessage[];
}

export interface ChatsArray {
    chats: Chats[];
}
