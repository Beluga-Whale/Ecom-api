export class CreateProductDto {
  name: string;
  imgProduct: string;
  desc: string;
  price: number;
  stock: number;
}

export class CalculatePrice {
  _id: string;
  quantity: number;
}
