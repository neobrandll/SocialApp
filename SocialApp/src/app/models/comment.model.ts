import {User} from './user.model';


export class Comment {
    constructor(
    public user: any,
    public _id: string,
    public createdAt: string,
    public commenterPicture: string,
    public commenterName: string,
    public body: string,
    ) {}
}




