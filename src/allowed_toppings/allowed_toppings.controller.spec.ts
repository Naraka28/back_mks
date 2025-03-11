import { Test, TestingModule } from '@nestjs/testing';
import { AllowedToppingsController } from './allowed_toppings.controller';

describe('AllowedToppingsController', () => {
  let controller: AllowedToppingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllowedToppingsController],
    }).compile();

    controller = module.get<AllowedToppingsController>(AllowedToppingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
