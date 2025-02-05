import { Controller, Post, Body } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateOrder } from './dto/create-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('calculate-price')
  calculatePrice(@Body() payload: CreateOrder[]) {
    return this.cartsService.calculatePrice(payload);
  }

  @Post('create-order')
  craeteOrder(@Body() payload: CreateOrder[]) {
    return this.cartsService.createOrder(payload);
  }
}
