const stock = {
  items: [
    { id: '1', name: 'name-1', quantity: 12 },
    { id: '2', name: 'name-2', quantity: 10 },
    { id: '3', name: 'name-3', quantity: 5 },
  ],
};

interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

export type Cart = CartItem[];

export class OrderController {
  createOrder({ cart }: { cart: Cart }) {
    const itemsOutOfStock = cart.filter((item) => !this.isItemInStock(item));

    if (itemsOutOfStock.length > 0) {
      const outOfSocketItemIds = itemsOutOfStock.map((item) => item.id);
      throw new Error(`Failed to create an order: found out of stock items (${outOfSocketItemIds.join(', ')})`);
    }

    return {
      cart,
    };
  }

  isItemInStock(item: CartItem): boolean {
    const itemInStock = stock.items.find((existingItem) => {
      return existingItem.id === item.id;
    });

    if (!itemInStock) return false;

    return itemInStock.quantity >= item.quantity;
  }
}
