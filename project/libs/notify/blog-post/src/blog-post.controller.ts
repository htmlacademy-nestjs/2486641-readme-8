import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting } from '@project/core';
import { MailService } from './mail-module/mail.service';



@Controller()
export class BlogPostController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.SendNewPosts,
    queue: 'readme.notify.posts',
  })
  public async test(dto) {
    //this.subscriberService.addSubscriber(subscriber);
    this.mailService.test(dto);
  }
}