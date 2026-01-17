import fs from "fs";
import path from "path";

export default class CartManager {
  constructor() {
    this.path = path.resolve("src/data/carts.json");
  }

  async getCarts() {
    if (!fs.existsSync(this.path)) return [];
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === id);
  }

  async createCart() {
    const carts = await this.getCarts();

    const newCart = {
      id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1,
      products: []
    };

    carts.push(newCart);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(carts, null, 2)
    );

    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;

    const productInCart = cart.products.find(
      p => p.product === productId
    );

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1
      });
    }

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(carts, null, 2)
    );

    return cart;
  }
}
