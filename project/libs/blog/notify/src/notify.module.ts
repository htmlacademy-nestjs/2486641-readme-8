import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { getRabbitMQOptions } from '@project/helpers';

import { NotifyService } from './notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit-blog')
    )
    // RabbitMQModule.forRoot(
    //   RabbitMQModule, 
    //   {
    //     exchanges: [
    //       {
    //         name: 'readme.notify',
    //         type: 'direct',
    //       },
    //     ],
    //     uri: 'amqp://admin:test@localhost:5672',
    //     connectionInitOptions: { wait: false },
    //   }
    // ),
  ],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule {}