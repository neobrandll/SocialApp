import {PostUserData} from './postUserData.model';

export class Post {
    constructor(
    public favoritesCount: number,
    public user: PostUserData,
    public _id: string,
    public createdAt: string,
    public favoriters: [],
    public favorites: [],
    public image: string,
    public comments: [],
    public body: string
    ) {}
}
