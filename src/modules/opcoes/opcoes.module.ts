import { Module } from '@nestjs/common';
import { OpcoesController } from './opcoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opcao } from 'src/modules/opcoes/opcao.entity';
import { OpcoesService } from './opcoes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Opcao])],
  controllers: [OpcoesController],
  providers: [OpcoesService],
})
export class OpcoesModule {}
