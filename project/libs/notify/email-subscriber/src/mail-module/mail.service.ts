import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Subscriber } from '@project/core';
import { NotifyConfig } from '@project/notify-config';

import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_NEW_POSTS_SUBJECT } from './mail.constant';
import { CreatePostMailDto } from '../dto/create-post-mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async test(posts: CreatePostMailDto[]) {
    //console.dir(dto);
    const text = posts.map((item) => item.id).join();
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: 'qwer@mail.com',
      subject: EMAIL_NEW_POSTS_SUBJECT,
      html: '<h2>Information about new posts</h2>',
      text: text
    })
  }
}