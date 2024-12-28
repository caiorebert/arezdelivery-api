import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Estabelecimento } from '../estabelecimento/estabelecimento.entity';
import { Categoria } from '../categoria/categoria.entity';
import { Carrinho } from '../carrinho/carrinho.entity';

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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  dt_inclusao: Date;

  @Column({ nullable: true })
  dt_exclusao: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.opcoes)
  categoria: Categoria;

  @ManyToOne(() => Estabelecimento, (estabelecimento) => estabelecimento.opcoes)
  @JoinColumn()
  estabelecimento: Estabelecimento;
}
