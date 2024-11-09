export class CreateUserDto {
    primeiroNome: string;
    ultimoNome: string;
    email: string;
    senha: string;

    constructor(primeiroNome: string, ultimoNome: string, email: string, senha: string) {
        this.primeiroNome = primeiroNome;
        this.ultimoNome = ultimoNome;
        this.email = email;
        this.senha = senha;
    }
}