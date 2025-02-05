import { Injectable } from '@nestjs/common';
import { CreateOrder } from './dto/create-cart.dto';
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

  async calculatePrice(products: CreateOrder[]) {
    const discount: number[] = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
    let totalPrice = 0;
    let priceDiscount = 0;
    console.log('product', products);

    const productAll = products.map((item: CreateOrder) => item._id); // NOTE - ดูว่ามีProduct _id กี่ประเภท
    console.log('productAll', productAll);

    for (const item of products) {
      const product = await this.productModel.findById(item._id).exec();
      if (product) {
        console.log('product.price', product.price);
        totalPrice += product.price * item.quantity;
      }
    }

    if (productAll.length > 1) {
      //NOTE - คำนวณส่วนลด
      priceDiscount = productAll.length * 100 * discount[productAll.length - 2];
      totalPrice -= priceDiscount; //NOTE - หักส่วนลดออกจากราคารวม
    }
    //NOTE - Return ทั้ง totalPrice และ priceDiscount
    return {
      totalPrice,
      priceDiscount,
    };
  }

  async createOrder(payload: CreateOrder[]) {
    //NOTE - คำนวณราคาจาก function calculatePrice
    const { totalPrice, priceDiscount } = await this.calculatePrice(payload);

    //NOTE - ใช้ Model constructor ในการสร้าง instance ของ Cart
    const cartDoc = new this.cartModel({
      productsList: payload.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      discount: priceDiscount,
      totalPrice: totalPrice,
    });
    const result = await this.cartModel.create(cartDoc);
    return result;
  }
}
