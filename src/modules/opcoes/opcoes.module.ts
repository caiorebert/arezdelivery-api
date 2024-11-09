import { Module } from '@nestjs/common';
import { OpcoesController } from './opcoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opcao } from 'src/modules/opcoes/opcao.entity';
import { OpcoesService } from './opcoes.service';
import { Estabelecimento } from '../estabelecimento/estabelecimento.entity';
import { Categoria } from '../categoria/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Opcao]),
    TypeOrmModule.forFeature([Estabelecimento]),
    TypeOrmModule.forFeature([Categoria]),
  ],
  controllers: [OpcoesController],
  providers: [OpcoesService],
})
export class OpcoesModule {}
