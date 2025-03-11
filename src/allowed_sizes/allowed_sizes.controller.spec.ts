import { Test, TestingModule } from '@nestjs/testing';
import { AllowedSizesController } from './allowed_sizes.controller';

describe('AllowedSizesController', () => {
  let controller: AllowedSizesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllowedSizesController],
    }).compile();

    controller = module.get<AllowedSizesController>(AllowedSizesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
