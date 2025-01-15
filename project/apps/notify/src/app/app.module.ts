import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotifyConfigModule, getMongooseOptions } from '@project/notify-config';
import { EmailSubscriberModule } from '@project/email-subscriber';
import { BlogPostModule } from '@project/notify-blog-post'

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyConfigModule,
    EmailSubscriberModule,
    BlogPostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
