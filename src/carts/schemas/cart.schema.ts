import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop([
    {
      productId: { type: Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
      priceTotal: { type: Number, required: true, min: 0 },
    },
  ])
  productsList: {
    productId: Types.ObjectId;
    quantity: number;
    priceTotal: number;
  };

  @Prop({ type: Number, required: true, min: 0 })
  discount: number;

  @Prop({ type: Number, required: true, min: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
