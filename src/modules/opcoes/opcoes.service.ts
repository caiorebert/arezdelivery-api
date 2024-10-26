import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opcao } from './opcao.entity';
import { CreateOpcaoDto } from './dto/create-opcao.dto';

@Injectable()
export class OpcoesService {
    constructor(
        @InjectRepository(Opcao)
        private opcaoRepository: Repository<Opcao>,
    ) {}

    async findAll(): Promise<Opcao[]> {
        return await this.opcaoRepository.find();
    }

    async create(createOpcaoDto: CreateOpcaoDto): Promise<Opcao> {
        const opcao = new Opcao();
        opcao.nome = createOpcaoDto.nome;
        opcao.preco = createOpcaoDto.preco;
        return await this.opcaoRepository.save(opcao);
    }

    async update(id: number, updateOpcaoDto: CreateOpcaoDto): Promise<Opcao> {
        const opcao = await this.opcaoRepository.findOneBy({ id });
        if (!opcao) {
            throw new Error('Opcao not found');
        }
        opcao.nome = updateOpcaoDto.nome;
        opcao.preco = updateOpcaoDto.preco;
        return await this.opcaoRepository.save(opcao);
    }

    async remove(id: string): Promise<void> {
        await this.opcaoRepository.delete(id);
    }
}
