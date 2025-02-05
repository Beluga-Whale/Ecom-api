import { Controller, Post, Body } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CalculatePrice } from './dto/create-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('calculate-price')
  calculatePrice(@Body() payload: CalculatePrice[]) {
    return this.cartsService.calculatePrice(payload);
  }
}
