import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Opcao } from '../opcoes/opcao.entity';

@Entity()
export class Estabelecimento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nome: string;

    @Column({ type: 'varchar', length: 255 })
    cnpj: string;

    @Column({ type: 'varchar', length: 255 })
    tagnome: string;

    @Column({ type: 'varchar', length: 255 })
    endereco: string;

    @Column({ type: 'varchar', length: 255 })
    telefone: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    foto: string;

    @Column({ type: 'boolean', default: true })
    ativo: boolean;

    @OneToMany(() => Opcao, (opcao) => opcao.estabelecimento)
    opcoes: Opcao[];
}
