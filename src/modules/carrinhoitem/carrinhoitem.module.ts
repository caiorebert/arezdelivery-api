import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrinhoItemService } from './carrinhoitem.service';
import { CarrinhoItemController } from './carrinhoitem.controller';
import { CarrinhoItem } from './carrinhoitem.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CarrinhoItem])],
    controllers: [CarrinhoItemController],
    providers: [CarrinhoItemService],
    exports: [CarrinhoItemService],
})
export class CarrinhoItemModule {}