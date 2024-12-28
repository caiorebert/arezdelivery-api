import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Opcao } from '../opcoes/opcao.entity';
import { Carrinho } from '../carrinho/carrinho.entity';

@Entity()
export class CarrinhoItem {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Carrinho, carrinho => carrinho.items)
    carrinho: Carrinho;

    @ManyToOne(() => Opcao)
    opcao: Opcao;

    @Column()
    quantidade: number;
}