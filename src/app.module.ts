import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcoesModule } from './modules/opcoes/opcoes.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EstabelecimentoModule } from './modules/estabelecimento/estabelecimento.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { CarrinhoModule } from './modules/carrinho/carrinho.module';
import { CarrinhoItemModule } from './modules/carrinhoitem/carrinhoitem.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      url: process.env.POSTGRES_URL,
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    OpcoesModule,
    EstabelecimentoModule,
    CategoriaModule,
    CarrinhoModule,
    CarrinhoItemModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [
    AuthModule,
    UsersModule,
    OpcoesModule,
    EstabelecimentoModule,
    CategoriaModule,
    CarrinhoModule,
    CarrinhoItemModule
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
