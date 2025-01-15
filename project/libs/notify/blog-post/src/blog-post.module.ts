import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/helpers';
import { MailModule } from './mail-module/mail.module';
import { BlogPostController } from './blog-post.controller';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule
  ],
  controllers: [
    BlogPostController,
  ],
  providers: []
})
export class BlogPostModule {}