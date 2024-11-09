import { Request, Response } from 'express';
import { CategoriaService } from './categoria.service'; 
import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDTO } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriaController {

    constructor(private readonly categoriaService: CategoriaService) {}

    @Get()
    async findAll() {
        return await this.categoriaService.findAll();
    }

    @Post()
    async create(@Body() createCategoriaDto: CreateCategoriaDto, @Res() res: Response) {
        const categoria = await this.categoriaService.create(createCategoriaDto);
        return res.status(201).json(categoria);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDTO, @Res() res: Response) {
        const categoria = await this.categoriaService.update(id, updateCategoriaDto);
        return res.status(200).json(categoria);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        await this.categoriaService.remove(id);
        return res.status(204).send();
    }
}