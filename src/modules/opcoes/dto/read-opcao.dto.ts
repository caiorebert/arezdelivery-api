export class ReadOpcaoDto {
    id?: number;
    nome: string;
    descricao?: string;
    preco: string;
    foto: string;
    categoria: string;

    constructor(nome: string, preco: string, descricao?: string, foto?: string) {
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.foto = foto;
    }
}