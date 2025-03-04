import { Test, TestingModule } from '@nestjs/testing';
import { ItemFlavoursController } from './item_flavours.controller';

describe('ItemFlavoursController', () => {
  let controller: ItemFlavoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemFlavoursController],
    }).compile();

    controller = module.get<ItemFlavoursController>(ItemFlavoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
