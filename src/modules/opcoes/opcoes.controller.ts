import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { OpcoesService } from './opcoes.service';
import { Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateOpcaoDto } from './dto/create-opcao.dto';
import { UpdateOpcaoDto } from './dto/update-opcao.dto';

@Controller('opcoes')
export class OpcoesController {

    constructor(private readonly opcoesService: OpcoesService) {}

    @Get()
    findAll() {
        return this.opcoesService.findAll();
    }

    @Post()
    create(@Body() createOpcaoDto: CreateOpcaoDto) {
        return this.opcoesService.create(createOpcaoDto);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateOpcaoDto: UpdateOpcaoDto) {
        return this.opcoesService.update(id, updateOpcaoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.opcoesService.remove(id);
    }
}
