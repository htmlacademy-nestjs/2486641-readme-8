import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogLikeModule } from '@project/blog-like';

@Module({
  imports: [BlogLikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
