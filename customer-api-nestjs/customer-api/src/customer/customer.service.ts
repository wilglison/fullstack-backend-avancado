import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; document: string; email: string }) {
    try {
      return await this.prisma.customer.create({
        data,
      });
    } catch (error) {
      console.error(`Error creating customer.`);
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.prisma.customer.findMany();
    } catch (error) {
      console.error(`Error fething customer.`);
      throw error;
    }
  }

  async getById(id: string) {
    try {
      return await this.prisma.customer.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(`Error fetching customer.`);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.customer.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error deleting customer.`);
      throw error;
    }
  }

  async update(
    id: string,
    data: { name: string; document: string; email: string },
  ) {
    try {
      return await this.prisma.customer.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(`Error updating customer.`);
      throw error;
    }
  }
}