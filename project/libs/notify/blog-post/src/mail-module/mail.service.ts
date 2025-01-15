import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { NotifyConfig } from '@project/notify-config';

import { EMAIL_NEW_POSTS_SUBJECT } from './mail.constant';
import { Post } from '@project/core';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>

  public async test(posts: Post[]) {
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