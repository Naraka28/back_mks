import { Test, TestingModule } from '@nestjs/testing';
import { AllowedToppingsService } from './allowed_toppings.service';

describe('AllowedToppingsService', () => {
  let service: AllowedToppingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllowedToppingsService],
    }).compile();

    service = module.get<AllowedToppingsService>(AllowedToppingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
