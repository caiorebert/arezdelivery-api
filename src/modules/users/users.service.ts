import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        
        const salt = await bcrypt.genSalt();        
        user.senha = await bcrypt.hash(user.senha, salt);
        return this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOneBy({ email });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user:User = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }
        user.primeiroNome = updateUserDto.primeiroNome;
        user.ultimoNome = updateUserDto.ultimoNome;
        user.email = updateUserDto.email;
        
        return await this.usersRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}