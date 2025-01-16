import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/core';
import { MailService } from './mail-module/mail.service';
import { CreatePostMailDto } from './dto/create-post-mail.dto';



@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.SendNewPosts,
    queue: 'readme.notify.posts',
  })
  public async test(dto: CreatePostMailDto[]) {
    console.log('controller test');
    const subscribers = await this.subscriberService.getAllSubscribers();
    await this.mailService.test(dto, subscribers);
  }
} 