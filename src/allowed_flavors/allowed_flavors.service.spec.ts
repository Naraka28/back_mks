import { Test, TestingModule } from '@nestjs/testing';
import { AllowedFlavorsService } from './allowed_flavors.service';

describe('AllowedFlavorsService', () => {
  let service: AllowedFlavorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllowedFlavorsService],
    }).compile();

    service = module.get<AllowedFlavorsService>(AllowedFlavorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
