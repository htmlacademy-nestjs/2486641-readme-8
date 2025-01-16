import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule } from '@project/blog-user';
import { AccountConfigModule, getMongooseOptions } from '@project/config'
import { NotifyModule } from '@project/account-notify';
@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    NotifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
