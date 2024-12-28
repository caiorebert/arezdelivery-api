import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CarrinhoItemService } from './carrinhoitem.service';
import { CreateCarrinhoItemDto } from './dto/create-carrinhoitem.dto';
import { UpdateCarrinhoItemDto } from './dto/update-carrinhoitem.dto';

@Controller('carrinhoitem')
export class CarrinhoItemController {
    constructor(private readonly carrinhoItemService: CarrinhoItemService) {}

    @Post()
    create(@Body() createCarrinhoItemDto: CreateCarrinhoItemDto) {
        return this.carrinhoItemService.create(createCarrinhoItemDto);
    }

    @Get()
    findAll() {
        return this.carrinhoItemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.carrinhoItemService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCarrinhoItemDto: UpdateCarrinhoItemDto) {
        return this.carrinhoItemService.update(+id, updateCarrinhoItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.carrinhoItemService.remove(+id);
    }
}