import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpcoesController } from './modules/opcoes/opcoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcoesService } from './modules/opcoes/opcoes.service';
import { OpcoesModule } from './modules/opcoes/opcoes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'arezdelivery',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    OpcoesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
