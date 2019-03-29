import {User} from './user.model';

export class UserProfile {
    constructor(
        public user: User,
    public tweets: any[],
    public tweetCount: number,
    public followerCount: number,
    public followingCount: number,
    ) {}



}
