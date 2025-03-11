import { Test, TestingModule } from '@nestjs/testing';
import { AllowedTempsController } from './allowed_temps.controller';

describe('AllowedTempsController', () => {
  let controller: AllowedTempsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllowedTempsController],
    }).compile();

    controller = module.get<AllowedTempsController>(AllowedTempsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
