import { Request, Response } from 'express';
import { EstabelecimentoService } from './estabelecimento.service'; 
import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDTO } from './dto/update-estabelecimento.dto';

@Controller('estabelecimentos')
export class EstabelecimentoController {

    constructor(private readonly estabelecimentoService: EstabelecimentoService) {}

    @Get()
    async findAll() {
        return await this.estabelecimentoService.findAll();
    }

    @Get(":tagnome")
    async findByNome(@Param('tagnome') tagnome: string) {
        return await this.estabelecimentoService.findByTagNome(tagnome);
    }

    @Get('/:id/opcoes')
    async findOpcoes(@Param('id') id: number) {
        return await this.estabelecimentoService.findOpcoes(id);
    }

    @Get('/:id/categorias')
    async findCategorias(@Param('id') id: number) {
        return await this.estabelecimentoService.findCategorias(id);
    }

    @Post()
    async create(@Body() createEstabelecimentoDto: CreateEstabelecimentoDto, @Res() res: Response) {
        const estabelecimento = await this.estabelecimentoService.create(createEstabelecimentoDto);
        return res.status(201).json(estabelecimento);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDTO, @Res() res: Response) {
        const estabelecimento = await this.estabelecimentoService.update(id, updateEstabelecimentoDto);
        return res.status(200).json(estabelecimento);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        await this.estabelecimentoService.remove(id);
        return res.status(204).send();
    }
}