export class ReadUserDto {
    username: string;
    email?: string;
    password: string;
    avatar: string;

    constructor(username: string, password: string, email?: string, avatar?: string) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.avatar = avatar;
    }
}