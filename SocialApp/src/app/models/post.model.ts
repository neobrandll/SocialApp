import {PostUserData} from './postUserData.model';

export class Post {
    constructor(
    public favoritesCount: number,
    public user: PostUserData,
    public _id: string,
    public createdAt: string,
    public favoriters: any[],
    public favorites: any[],
    public image: string,
    public comments: any[],
    public body: string
    ) {}
}
