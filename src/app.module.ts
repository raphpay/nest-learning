import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Bike } from './bikes/bike.entity';
import { BikeModule } from './bikes/bike.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HelloController } from './hello/hello.controller';
import { HelloService } from './hello/hello.service';
import { User } from './users/user.entity';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Bike],
      synchronize: true, // /!\ uniquement pour dev
    }),
    TypeOrmModule.forFeature([User, Bike]), // rend accessible dans DI ( Dependency Injection)
    UserModule,
    BikeModule,
  ],
  controllers: [AppController, HelloController],
  providers: [AppService, HelloService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // or 'users'
  }
}
