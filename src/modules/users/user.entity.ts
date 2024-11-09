import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}