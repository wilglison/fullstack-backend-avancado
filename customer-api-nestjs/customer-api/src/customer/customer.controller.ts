import { Controller, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Post } from '@nestjs/common';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async create(data: { name: string; document: string }) {
    try {
      return await this.customerService.create(data);
    } catch (error) {
      this.handleError(error, 'Error creating customer');
    }
  }

  private handleError(
    error: any,
    customMessage: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    if (error instanceof Error) {
      console.error(`${customMessage}:`, error);
      throw new HttpException(error, statusCode);
    } else {
      console.error(`${customMessage}:`, error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
