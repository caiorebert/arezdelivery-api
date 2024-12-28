import { Injectable } from '@nestjs/common';
import { Carrinho } from './carrinho.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';
import { User } from '../users/user.entity';
import { CarrinhoItem } from '../carrinhoitem/carrinhoitem.entity';
import { UserJaPossuiCarrinho } from 'src/exceptions/userJaPossuiCarrinho';

@Injectable()
export class CarrinhoService {
    constructor(
        @InjectRepository(Carrinho)
        private readonly carrinhoRepository: Repository<Carrinho>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(CarrinhoItem)
        private readonly carrinhoItemRepository: Repository<CarrinhoItem>,
    ) {}

    async findAll(): Promise<Carrinho[]> {
        return await this.carrinhoRepository.find();
    }

    async findOne(id: number): Promise<Carrinho> {
        return await this.carrinhoRepository.findOneBy({ id });
    }

    async create(carrinho: CreateCarrinhoDto): Promise<Carrinho> {
        if (this.userTemCarrinho(carrinho.userId)) {
            throw new UserJaPossuiCarrinho();
        }
        return await this.carrinhoRepository.save(carrinho);
    }

    async update(id: number, carrinho: UpdateCarrinhoDto): Promise<Carrinho> {
        const carrinhoAtual = await this.findOne(id);
        if (!carrinhoAtual) {
            return null;
        }
        await this.carrinhoRepository.update(id, carrinho);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.carrinhoRepository.delete(id);
    }

    async userTemCarrinho(userId: number): Promise<boolean> {
        const carrinho = await this.carrinhoRepository.findOneBy({ user: { id: userId } });
        return !!carrinho;
    }
}