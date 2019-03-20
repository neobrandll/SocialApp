export class Post {
    constructor(
        public info: {
            id: string,
            favoritesCount: number,
            user: {
                id: string,
                name: string,
                username: string,
                profileImage: string
            }
        },
        public content: {
            createdTime: Date,
            favoriters: [],
            favorites: [],
            image: string,
            comments: [],
            body: string,
        }
    ) {}
}
