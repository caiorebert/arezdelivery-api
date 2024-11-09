import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validaUsuario(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        Logger.log(user.senha);
        if (await bcrypt.compare(pass, user.senha)) {
            const { senha, ...result } = user;
            return result;
        }
        return null;
    }

    async login(body: any) {
        const user = await this.validaUsuario(body.email, body.senha);

        if (user==null) {
            return { message: 'Senha incorreta' };
        }

        const payload = { username: user.email, sub: body.userId };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: User) {
        return this.usersService.create(user);
    }

    async usuarioLogado(authorization: string) {
        try {
            const token = this.jwtService.verify(
                this.extractTokenFromHeader(authorization), 
                {
                    secret: process.env.JWT_SECRET
                }
            );

            return {
                data: true,
                user: token,
            };
        } catch (JsonWebTokenError) {
            return {
                data: false,
                user: null,
            };
        }
    }

    extractTokenFromHeader(authorization: any): string | undefined {
        const [type, token] = authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}