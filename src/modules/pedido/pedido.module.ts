// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { EstabelecimentoController } from './estabelecimento.controller';
// import { EstabelecimentoService } from './pedido.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Estabelecimento } from './pedido.entity';

// @Module({
//     imports: [
//         ConfigModule.forRoot(),
//         TypeOrmModule.forFeature([Estabelecimento]),
//     ],
//     providers: [EstabelecimentoService],
//     controllers: [EstabelecimentoController],
//     exports: [EstabelecimentoService],
// })
// export class EstabelecimentoModule {}