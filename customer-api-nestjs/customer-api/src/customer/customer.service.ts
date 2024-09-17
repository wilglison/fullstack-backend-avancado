import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prismaService: PrismaService) {}

  async create(data: { name: string; document: string }) {
    return this.prismaService.customer.create({
      data: {
        name: data.name,
        document: data.document,
      },
    });
  }
}
