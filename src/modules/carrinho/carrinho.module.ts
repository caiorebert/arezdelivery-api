import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrinho } from './carrinho.entity';
import { User } from '../users/user.entity';
import { CarrinhoItemService } from '../carrinhoitem/carrinhoitem.service';
import { CarrinhoItem } from '../carrinhoitem/carrinhoitem.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Carrinho]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([CarrinhoItem])
    ],
    providers: [CarrinhoService],
    controllers: [CarrinhoController],
    exports: [CarrinhoService]
})
export class CarrinhoModule {}