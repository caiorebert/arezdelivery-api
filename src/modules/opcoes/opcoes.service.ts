import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opcao } from './opcao.entity';
import { CreateOpcaoDto } from './dto/create-opcao.dto';
import { ReadOpcaoDto } from './dto/read-opcao.dto';
import { Estabelecimento } from '../estabelecimento/estabelecimento.entity';
import { Categoria } from '../categoria/categoria.entity';
import { UpdateOpcaoDto } from './dto/update-opcao.dto';

@Injectable()
export class OpcoesService {
    constructor(
        @InjectRepository(Opcao)
        private opcaoRepository: Repository<Opcao>,
        @InjectRepository(Estabelecimento)
        private estabelecimentoRepository: Repository<Estabelecimento>,
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ) {}

    async findAll(): Promise<Opcao[]> {
        const opcoes = await this.opcaoRepository.find({ where: { dt_exclusao: null }, order: { dt_inclusao: 'DESC', nome: 'ASC' } });
        const opcoesDTO = [];
        opcoes.forEach((opcao, index) => {
            const opcaoDTO = new ReadOpcaoDto(
                opcao.nome,
                opcao.preco.toString(),
                opcao.descricao,
                opcao.foto,
            );
            opcaoDTO.preco = (opcaoDTO.preco.indexOf(".") > -1) ? opcaoDTO.preco.replace(".", ",") : `${opcaoDTO.preco},00`;
            opcoesDTO.push(opcaoDTO);
        });
        return opcoesDTO;
    }

    async create(createOpcaoDto: CreateOpcaoDto): Promise<Opcao> {
        const opcao = this.opcaoRepository.create(createOpcaoDto);
        const categoria = await this.categoriaRepository.findOneBy({ id: createOpcaoDto.categoriaId });
        if (!categoria) {
            throw new Error('Categoria not found');
        }
        
        opcao.categoria = categoria;
        
        const estabelecimento = await this.estabelecimentoRepository.findOneBy({ id: createOpcaoDto.estabelecimentoId });
        if (!estabelecimento) {
            throw new Error('Estabelecimento not found');
        }

        opcao.estabelecimento = estabelecimento

        if (opcao.foto == null) {
            opcao.foto = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt3sPWjr5DgU2hzlm6MmFQhnck5YKjhmE6vQ&s";
        }
        return await this.opcaoRepository.save(opcao);
    }

    async update(id: number, updateOpcaoDto: UpdateOpcaoDto): Promise<Opcao> {
        const opcao = await this.opcaoRepository.findOneBy({ id });
        if (!opcao) {
            throw new Error('Opcao not found');
        }
        opcao.nome = updateOpcaoDto.nome;
        opcao.preco = updateOpcaoDto.preco;
        opcao.descricao = updateOpcaoDto.descricao;
        opcao.foto = updateOpcaoDto.foto;

        const categoria = await this.categoriaRepository.findOneBy({ id: updateOpcaoDto.categoriaId });
        if (!categoria) {
            throw new Error('Categoria not found');
        }
        
        opcao.categoria = categoria;
        
        const estabelecimento = await this.estabelecimentoRepository.findOneBy({ id: updateOpcaoDto.estabelecimentoId });
        if (!estabelecimento) {
            throw new Error('Estabelecimento not found');
        }

        opcao.estabelecimento = estabelecimento

        return await this.opcaoRepository.save(opcao);
    }

    async remove(id: string): Promise<void> {
        await this.opcaoRepository.delete(id);
    }
}
