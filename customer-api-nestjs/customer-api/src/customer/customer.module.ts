import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CheckIdMiddleware } from './check-id.middleware';

@Module({
  providers: [CustomerService, PrismaService],
  controllers: [CustomerController],
})
export class CustomerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckIdMiddleware)
      .forRoutes(
        { path: 'customers/:id', method: RequestMethod.PUT },
        { path: 'customers/:id', method: RequestMethod.DELETE },
      );
  }
}