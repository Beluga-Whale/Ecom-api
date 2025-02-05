import { Injectable } from '@nestjs/common';
import { CalculatePrice } from './dto/create-cart.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Model } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async calculatePrice(products: CalculatePrice[]) {
    const discount: number[] = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
    let totalPrice = 0;

    const productAll = products.map((item: CalculatePrice) => item._id); // NOTE - ดูว่ามีProduct _id กี่ประเภท
    for (const item of products) {
      const product = await this.productModel.findById(item._id).exec();
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }
    if (productAll.length > 1) {
      const priceDiscount =
        productAll.length * 100 * discount[productAll.length - 2];

      totalPrice -= priceDiscount;
      return totalPrice;
    }

    return totalPrice;
  }
}
