import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Opcao } from '../opcoes/opcao.entity';
import { CarrinhoItem } from '../carrinhoitem/carrinhoitem.entity';

@Entity()
export class Carrinho {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, user => user.carrinho)
    user: User;

    @OneToMany(() => CarrinhoItem, carrinhoItem => carrinhoItem.carrinho)
    items: CarrinhoItem[];

    @Column({ default: 0 })
    total: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    criadoEm: Date;

    @Column({ type: 'timestamp', nullable: true })
    atualizadoEm: Date;
}