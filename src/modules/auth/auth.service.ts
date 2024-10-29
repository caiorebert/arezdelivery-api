import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
// import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        // private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByName(username, username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(body: any) {
        const user = this.validateUser(body.username, body.password);
        // const payload: JwtPayload = { username: body.username, sub: body.userId };
        // return {
        //     access_token: this.jwtService.sign(payload),
        // };
    }

    async register(user: User) {
        return this.usersService.create(user);
    }
}