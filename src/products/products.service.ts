import { Injectable } from '@nestjs/common';
import { CalculatePrice, CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const result = await this.productModel.create(createProductDto);
    return result;
  }

  async findAll(page: number = 1, limit: number = 5) {
    //NOTE - skipเพื่อยอกว่าจะข้ามไปกี่ตัว
    const skip = (page - 1) * limit;
    const total = await this.productModel.countDocuments(); //NOTE - นับจำนวนสินค้าที่มีทั้วหมด

    // NOTE - หาจำนวนหน้าทั้งหมด
    const totalPage = Math.ceil(total / limit);

    const data = await this.productModel.find().skip(skip).limit(limit).exec();
    return {
      data,
      total,
      totalPage,
      page,
      limit,
    };
  }

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
