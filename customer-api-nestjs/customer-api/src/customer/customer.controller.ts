import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(
    @Body() data: { name: string; document: string; email: string },
  ) {
    try {
      return await this.customerService.create(data);
    } catch (error) {
      this.handleHttpError(error, 'Failed to create customer');
    }
  }

  @Get()
  async getAll() {
    try {
      return await this.customerService.getAll();
    } catch (error) {
      this.handleHttpError(error, 'Failed to retrieve customers');
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const customer = await this.customerService.getById(id);
      if (!customer) {
        throw new HttpException('Customer not found.', HttpStatus.NOT_FOUND);
      }
      return customer;
    } catch (error) {
      this.handleHttpError(error, 'Failed to fetching customer.');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    data: { name: string; document: string; email: string },
  ) {
    try {
      return await this.customerService.update(id, data);
    } catch (error) {
      this.handleHttpError(error, 'Failed to update customer');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      return await this.customerService.delete(id);
    } catch (error) {
      this.handleHttpError(error, 'Failed to delete customer');
    }
  }

  private handleHttpError(
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