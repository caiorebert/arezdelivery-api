import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Opcao } from '../opcoes/opcao.entity';

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nome: string;

    @OneToMany(() => Opcao, (opcao) => opcao.categoria)
    opcoes: Opcao[];
}
