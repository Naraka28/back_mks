import { Test, TestingModule } from '@nestjs/testing';
import { ItemToppingsService } from './item_toppings.service';

describe('ItemToppingsService', () => {
  let service: ItemToppingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemToppingsService],
    }).compile();

    service = module.get<ItemToppingsService>(ItemToppingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
