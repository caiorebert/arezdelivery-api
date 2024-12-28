import { HttpException, HttpStatus } from '@nestjs/common';

export class UserJaPossuiCarrinho extends HttpException {
  constructor() {
    super("Usuário já possui carrinho", 400);
  }
}