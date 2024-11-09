import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { LoginDTO } from './dto/loginDTO';

@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    public async register(req: Request, res: Response): Promise<Response> {
        try {
            const user = await this.authService.register(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    @Post("/login")
    public async login(@Body() login: LoginDTO): Promise<any> {
        const token = await this.authService.login(login);
        return token;
    }

    @Get("/logado")
    public async logado(@Req() req: Request, res:Response): Promise<any> {
        return this.authService.usuarioLogado(req.headers.authorization);
    }
}