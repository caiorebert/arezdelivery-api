import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Opcao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  preco: string;

  @Column({ nullable: true })
  foto: string;

  @Column( { nullable: true })
  descricao: string;
}
