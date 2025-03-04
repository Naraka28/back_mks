import { Test, TestingModule } from '@nestjs/testing';
import { ItemToppingsController } from './item_toppings.controller';

describe('ItemToppingsController', () => {
  let controller: ItemToppingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemToppingsController],
    }).compile();

    controller = module.get<ItemToppingsController>(ItemToppingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
