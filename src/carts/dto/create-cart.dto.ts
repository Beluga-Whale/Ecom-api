import { Types } from 'mongoose';
import { IsNumber, IsMongoId, Min } from 'class-validator';
export class CreateOrder {
  @IsMongoId()
  _id: Types.ObjectId;
  @IsNumber()
  @Min(1)
  quantity: number;
  @IsNumber()
  price?: number;
}
