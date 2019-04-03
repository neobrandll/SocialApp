export interface UserProfileUser {
    _id: string;
    name: string;
    username: string;
    provider: string;
    email: string;
    following: string[];
    followers: string[];
    profileImage: string;
}

export class UserProfile {
    constructor(
        public user: UserProfileUser,
    public tweets: any[],
    public tweetCount: number,
    public followerCount: number,
    public followingCount: number,
    ) {}



}
