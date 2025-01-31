import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: [Types.ObjectId], required: true })
  productId: Types.ObjectId[];

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  priceTotal: number;

  @Prop({ required: true })
  discount: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
