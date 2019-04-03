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
