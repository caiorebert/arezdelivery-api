export class CreateOpcaoDto {
    nome: string;
    descricao?: string;
    preco: string;

    constructor(nome: string, preco: string, descricao?: string) {
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
    }
}