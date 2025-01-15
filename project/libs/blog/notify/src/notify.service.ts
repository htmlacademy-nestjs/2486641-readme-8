import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { Post, RabbitRouting } from '@project/core';
import { rabbitConfig } from '@project/blog-config';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async sendNewPosts(posts: Post[]) {
    //console.dir(this.rabbiOptions);
    return this.rabbitClient.publish(
      this.rabbiOptions.exchange,
      RabbitRouting.SendNewPosts,
      posts
    );
  }
}