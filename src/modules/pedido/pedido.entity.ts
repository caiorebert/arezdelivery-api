// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Opcao } from '../opcoes/opcao.entity'; 

// @Entity()
// export class Pedido {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     data: Date;

//     @Column()
//     status: string;

//     @ManyToOne(() => Cliente, cliente => cliente.pedidos)
//     // cliente: Cliente;

//     // @ManyToOne(() => Produto, produto => produto.pedidos)
//     // opcao: Opcao[];

//     @Column('decimal', { precision: 10, scale: 2 })
//     valorTotal: number;
// }