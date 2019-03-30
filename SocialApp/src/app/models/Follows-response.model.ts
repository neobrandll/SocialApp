export interface FollowsResponse {
    user: UserResponse;
    followers: UserResponse[];
    tweetCount: number;
    followerCount: number;
    followingCount: number;
}

export interface UserResponse {
    _id:  string;
    email:  string;
    username:  string;
    name: string ;
    following: string[];
    followers: string[];
    profileImage: string;
}
