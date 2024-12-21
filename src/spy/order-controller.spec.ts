import { Cart, OrderController } from './order-controller';

describe('orderController', () => {
  it('creates an order when all items are in stock', () => {
    const controller = new OrderController();
    vi.spyOn(controller, 'isItemInStock').mockReturnValue(true);

    const cart: Cart = [{ id: '1', name: 'product', quantity: 2 }];
    const order = controller.createOrder({ cart });

    expect(order).toEqual({
      cart: [{ id: '1', name: 'product', quantity: 2 }],
    });
  });

  it('throws an error when one of items is out of stock', () => {
    const controller = new OrderController();
    vi.spyOn(controller, 'isItemInStock').mockImplementation((item) => item.id === '2');

    const cart: Cart = [
      { id: '2', name: 'product 1', quantity: 2 },
      { id: '3', name: 'product 2', quantity: 5 },
      { id: '4', name: 'product 3', quantity: 1 },
    ];

    expect(() => controller.createOrder({ cart })).toThrowError(
      'Failed to create an order: found out of stock items (3, 4)'
    );
  });
});
