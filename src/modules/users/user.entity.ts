import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Carrinho } from '../carrinho/carrinho.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @Column()
    primeiroNome: string;

    @Column()
    ultimoNome: string;

    @CreateDateColumn()
    criadoEm: Date;

    @UpdateDateColumn()
    alteradoEm: Date;

    @OneToOne(() => Carrinho, carrinho => carrinho.user, { cascade: true })
    @JoinColumn()
    carrinho: Carrinho;
}