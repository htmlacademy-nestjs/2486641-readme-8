import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Subscriber } from '@project/core';
import { NotifyConfig } from '@project/notify-config';

import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_NEW_POSTS_SUBJECT } from './mail.constant';
import { CreatePostMailDto } from '../dto/create-post-mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>

  private getHtml(posts: CreatePostMailDto[]): string {
    const htmlTable = posts.map((post) => 
      `<tr>
        <td>${post.id}</td>
        <td>${post.postDate}</td>
        <td>${post.type}</td>
        <td>${post.userId}</td>
      </tr>`
    );
    return (
      `<h2>Information about new posts</h2>
      <table style="width:100%" border="1">
        <tr>
          <th>Post ID</th>
          <th>Post date</th>
          <th>Type</th>
          <th>User Id</th>
        </tr>
        ${htmlTable}
      </table>`
    );
  }

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

  public async sendNotify(posts: CreatePostMailDto[], subscribers: Subscriber[]) {
    const html = this.getHtml(posts);
    for (const subscriber of subscribers) {
      await this.mailerService.sendMail({
        from: this.notifyConfig.mail.from,
        to: subscriber.email,
        subject: EMAIL_NEW_POSTS_SUBJECT,
        html: html,
      })
    }
  }
}