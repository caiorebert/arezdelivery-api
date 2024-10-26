export class UpdateOpcaoDto {
    id: number;
    nome: string;
    descricao?: string;
    preco: string;

    constructor(id: number, nome: string, preco: string, descricao?: string) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
    }
}