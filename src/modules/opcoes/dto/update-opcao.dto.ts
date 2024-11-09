export class UpdateOpcaoDto {
    id: number;
    nome: string;
    descricao?: string;
    preco: string;
    foto?: string;
    estabelecimentoId: number;
    categoriaId: number;
}