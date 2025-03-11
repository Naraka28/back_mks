import { Test, TestingModule } from '@nestjs/testing';
import { AllowedMilksService } from './allowed_milks.service';

describe('AllowedMilksService', () => {
  let service: AllowedMilksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllowedMilksService],
    }).compile();

    service = module.get<AllowedMilksService>(AllowedMilksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
