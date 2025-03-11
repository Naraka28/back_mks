import { Test, TestingModule } from '@nestjs/testing';
import { AllowedGrainsController } from './allowed_grains.controller';

describe('AllowedGrainsController', () => {
  let controller: AllowedGrainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllowedGrainsController],
    }).compile();

    controller = module.get<AllowedGrainsController>(AllowedGrainsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
