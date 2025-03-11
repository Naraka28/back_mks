import { Test, TestingModule } from '@nestjs/testing';
import { AllowedGrainsService } from './allowed_grains.service';

describe('AllowedGrainsService', () => {
  let service: AllowedGrainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllowedGrainsService],
    }).compile();

    service = module.get<AllowedGrainsService>(AllowedGrainsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
