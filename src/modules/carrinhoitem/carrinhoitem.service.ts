import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarrinhoItem } from './carrinhoitem.entity';
import { CreateCarrinhoItemDto } from './dto/create-carrinhoitem.dto';
import { UpdateCarrinhoItemDto } from './dto/update-carrinhoitem.dto';

@Injectable()
export class CarrinhoItemService {
    constructor(
        @InjectRepository(CarrinhoItem)
        private readonly carrinhoItemRepository: Repository<CarrinhoItem>,
    ) {}

    async create(createCarrinhoItemDto: CreateCarrinhoItemDto): Promise<CarrinhoItem> {
        const carrinhoItem = this.carrinhoItemRepository.create(createCarrinhoItemDto);
        return this.carrinhoItemRepository.save(carrinhoItem);
    }

    async findAll(): Promise<CarrinhoItem[]> {
        return this.carrinhoItemRepository.find();
    }

    async findOne(id: number): Promise<CarrinhoItem> {
        const carrinhoItem = await this.carrinhoItemRepository.findOneBy({id});
        if (!carrinhoItem) {
            throw new NotFoundException(`CarrinhoItem with ID ${id} not found`);
        }
        return carrinhoItem;
    }

    async update(id: number, updateCarrinhoItemDto: UpdateCarrinhoItemDto): Promise<CarrinhoItem> {
        await this.carrinhoItemRepository.update(id, updateCarrinhoItemDto);
        const updatedCarrinhoItem = await this.findOne(id);
        if (!updatedCarrinhoItem) {
            throw new NotFoundException(`CarrinhoItem with ID ${id} not found`);
        }
        return updatedCarrinhoItem;
    }

    async remove(id: number): Promise<void> {
        const result = await this.carrinhoItemRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`CarrinhoItem with ID ${id} not found`);
        }
    }
}