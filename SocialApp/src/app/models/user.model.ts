export class User {
    constructor(
    private _token: string,
    public id: string,
    public email: string,
    public name: string,
    public username: string,
    public followers: string[],
    public following: string[],
    public profileImage: string,
    ) {}


    get token() {
        return this._token;
    }
}
