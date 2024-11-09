export class CreateOpcaoDto {
    nome: string;
    descricao?: string;
    preco: string;
    foto?: string;
    estabelecimentoId: number;
    categoriaId: number;
}