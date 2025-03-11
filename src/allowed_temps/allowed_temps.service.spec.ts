import { Test, TestingModule } from '@nestjs/testing';
import { AllowedTempsService } from './allowed_temps.service';

describe('AllowedTempsService', () => {
  let service: AllowedTempsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllowedTempsService],
    }).compile();

    service = module.get<AllowedTempsService>(AllowedTempsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
