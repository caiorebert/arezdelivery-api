import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Estabelecimento } from './estabelecimento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDTO } from './dto/update-estabelecimento.dto';
import { ReadOpcaoDto } from '../opcoes/dto/read-opcao.dto';

@Injectable()
export class EstabelecimentoService {
    
    constructor(
        @InjectRepository(Estabelecimento)
        private estabelecimentoRepository: Repository<Estabelecimento>,
    ) {}

    async findAll(): Promise<Estabelecimento[]> {
        return await this.estabelecimentoRepository.find({ relations: ['opcoes', 'opcoes.categoria']});
    }

    async create(estabelecimentoDTO: CreateEstabelecimentoDto): Promise<Estabelecimento> {

        return await this.estabelecimentoRepository.save(estabelecimentoDTO);
    }

    async update(id: number, updateEstabelecimentoDto: UpdateEstabelecimentoDTO): Promise<Estabelecimento> {
        const estabelecimentoToUpdate = await this.estabelecimentoRepository.findOneBy({ id });
        if (!estabelecimentoToUpdate) {
            throw new Error('Estabelecimento not found');
        }
        estabelecimentoToUpdate.nome = updateEstabelecimentoDto.nome;
        // estabelecimentoToUpdate.cnpj = updateEstabelecimentoDto.cnpj;
        estabelecimentoToUpdate.endereco = updateEstabelecimentoDto.endereco;
        estabelecimentoToUpdate.telefone = updateEstabelecimentoDto.telefone;
        estabelecimentoToUpdate.email = updateEstabelecimentoDto.email;
        estabelecimentoToUpdate.ativo = updateEstabelecimentoDto.ativo;
        estabelecimentoToUpdate.foto = updateEstabelecimentoDto.foto;

        return await this.estabelecimentoRepository.save(estabelecimentoToUpdate);
    }

    async remove(id: string): Promise<void> {
        await this.estabelecimentoRepository.delete(id);
    }

    async findOne(id: number): Promise<Estabelecimento> {
        return await this.estabelecimentoRepository.findOneBy({ id });
    }

    async findByTagNome(tagnome: string): Promise<Estabelecimento> {
        return await this.estabelecimentoRepository.findOneBy({ tagnome });
    }

    async findOpcoes(id: number): Promise<any> {
        const estabelecimento = (await this.estabelecimentoRepository.find({ relations: ['opcoes', 'opcoes.categoria'], where: { id: id}}))[0];
        const opcoesDTO = [];
        if (estabelecimento!=null) {
            estabelecimento.opcoes.forEach((opcao, index) => {
                const opcaoDTO = new ReadOpcaoDto(
                    opcao.nome,
                    opcao.preco.toString(),
                    opcao.descricao,
                    opcao.foto,
                );
                opcaoDTO.categoria = opcao.categoria.nome;
                opcaoDTO.preco = (opcaoDTO.preco.indexOf(".") > -1) ? opcaoDTO.preco.replace(".", ",") : `${opcaoDTO.preco},00`;
                opcoesDTO.push(opcaoDTO);
            });
        }
        return opcoesDTO;
    }

    async findCategorias(id: number): Promise<any> {
        const estabelecimento = (await this.estabelecimentoRepository.find({ relations: ['opcoes', 'opcoes.categoria'], where: { id: id}}))[0];
        const categoriasDTO = [];
        if (estabelecimento!=null) {
            estabelecimento.opcoes.forEach((opcao, index) => {
                if (categoriasDTO.find(categoria => categoria.id === opcao.categoria.id)) {
                    return;
                }
                categoriasDTO.push({
                    id: opcao.categoria.id,
                    nome: opcao.categoria.nome
                });
            });
        }
        return categoriasDTO;
    }
    
}