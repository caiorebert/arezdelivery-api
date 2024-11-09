import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Categoria } from './categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDTO } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
    
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ) {}

    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find();
    }

    async create(categoriaDTO: CreateCategoriaDto): Promise<Categoria> {
        categoriaDTO.nome = categoriaDTO.nome.toUpperCase();
        return await this.categoriaRepository.save(categoriaDTO);
    }

    async update(id: number, updateCategoriaDto: UpdateCategoriaDTO): Promise<Categoria> {
        const categoriaToUpdate = await this.categoriaRepository.findOneBy({ id });
        if (!categoriaToUpdate) {
            throw new Error('Categoria not found');
        }
        categoriaToUpdate.nome = updateCategoriaDto.nome.toUpperCase();

        return await this.categoriaRepository.save(categoriaToUpdate);
    }

    async remove(id: string): Promise<void> {
        await this.categoriaRepository.delete(id);
    }

    async findOne(id: number): Promise<Categoria> {
        return await this.categoriaRepository.findOneBy({ id });
    }
    
}