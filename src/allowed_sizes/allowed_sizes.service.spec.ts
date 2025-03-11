import { Test, TestingModule } from '@nestjs/testing';
import { AllowedSizesService } from './allowed_sizes.service';

describe('AllowedSizesService', () => {
  let service: AllowedSizesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllowedSizesService],
    }).compile();

    service = module.get<AllowedSizesService>(AllowedSizesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
