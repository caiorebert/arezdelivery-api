import { Test, TestingModule } from '@nestjs/testing';
import { OpcoesController } from './opcoes.controller';

describe('OpcoesController', () => {
  let controller: OpcoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpcoesController],
    }).compile();

    controller = module.get<OpcoesController>(OpcoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
