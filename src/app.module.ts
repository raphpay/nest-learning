import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { HelloController } from './hello/hello.controller';
import { HelloModule } from './hello/hello.module';
import { HelloService } from './hello/hello.service';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule, HelloModule],
  controllers: [AppController, HelloController],
  providers: [AppService, HelloService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // or 'users'
  }
}
