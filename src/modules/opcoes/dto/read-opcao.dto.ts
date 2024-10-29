export class ReadOpcaoDto {
    nome: string;
    descricao?: string;
    preco: string;
    foto: string;

    constructor(nome: string, preco: string, descricao?: string, foto?: string) {
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.foto = foto;
    }
}