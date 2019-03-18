export class Post {
    constructor(public postId: number, 
                public userId: number,
                public typePostId: number, 
                public postText: string, 
                public postUrl: string, 
                public postCreationTime: string, 
                public likes: string, 
                public dislikes: string,
                public comments: string,
                public isMine: boolean) {}
}
