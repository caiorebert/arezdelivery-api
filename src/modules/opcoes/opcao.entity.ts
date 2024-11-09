import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Estabelecimento } from '../estabelecimento/estabelecimento.entity';
import { Categoria } from '../categoria/categoria.entity';

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

  @OneToOne(() => Categoria)
  @JoinColumn()
  categoria: Categoria;

  @ManyToOne(() => Estabelecimento, (estabelecimento) => estabelecimento.opcoes)
  @JoinColumn()
  estabelecimento: Estabelecimento;
}
