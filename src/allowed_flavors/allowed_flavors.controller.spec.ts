import { Test, TestingModule } from '@nestjs/testing';
import { AllowedFlavorsController } from './allowed_flavors.controller';

describe('AllowedFlavorsController', () => {
  let controller: AllowedFlavorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllowedFlavorsController],
    }).compile();

    controller = module.get<AllowedFlavorsController>(AllowedFlavorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
