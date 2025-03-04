import { Test, TestingModule } from '@nestjs/testing';
import { ItemFlavoursService } from './item_flavours.service';

describe('ItemFlavoursService', () => {
  let service: ItemFlavoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemFlavoursService],
    }).compile();

    service = module.get<ItemFlavoursService>(ItemFlavoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
