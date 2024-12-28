import { Controller, Get, Post, Body, Param, Delete, Put, Logger } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';

@Controller('carrinho')
export class CarrinhoController {
    constructor(private readonly carrinhoService: CarrinhoService) {}

    @Post()
    create(@Body() createCarrinhoDto: CreateCarrinhoDto) {
        try {
            return this.carrinhoService.create(createCarrinhoDto);
        } catch (error) {
            Logger.error('Error creating carrinho', error);
            throw error;
        }
    }

    @Get()
    findAll() {
        return this.carrinhoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.carrinhoService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateCarrinhoDto: UpdateCarrinhoDto) {
        return this.carrinhoService.update(+id, updateCarrinhoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.carrinhoService.remove(+id);
    }
}