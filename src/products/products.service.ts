import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
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
}
