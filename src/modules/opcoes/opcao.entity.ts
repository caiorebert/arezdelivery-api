import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Opcao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  preco: string;
}
