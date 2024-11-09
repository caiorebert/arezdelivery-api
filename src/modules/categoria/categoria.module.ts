import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([Categoria]),
    ],
    providers: [CategoriaService],
    controllers: [CategoriaController],
    exports: [CategoriaService],
})
export class CategoriaModule {}