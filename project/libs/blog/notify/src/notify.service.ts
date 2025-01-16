import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/core';
import { rabbitConfig } from '@project/blog-config';
import { CreatePostMailDto } from './dto/create-post-mail.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  // public async createPostMail(dto: CreatePostMailDto) {
  //   //console.dir(this.rabbiOptions);
  //   return this.rabbitClient.publish(
  //     this.rabbiOptions.exchange,
  //     RabbitRouting.SendNewPosts,
  //     { ...dto }
  //   );
  // }

  public async sendPosts(posts: CreatePostMailDto[])
  {
    //console.dir(this.rabbiOptions);
    return this.rabbitClient.publish(
      this.rabbiOptions.exchange,
      RabbitRouting.SendNewPosts,
      posts
    );
  }
}