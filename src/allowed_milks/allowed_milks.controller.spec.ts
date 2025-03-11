import { Test, TestingModule } from '@nestjs/testing';
import { AllowedMilksController } from './allowed_milks.controller';

describe('AllowedMilksController', () => {
  let controller: AllowedMilksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllowedMilksController],
    }).compile();

    controller = module.get<AllowedMilksController>(AllowedMilksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
