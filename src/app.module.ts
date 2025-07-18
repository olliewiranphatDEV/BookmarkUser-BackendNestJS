import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

// HERE FOR REGISTER!

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true // USE EVERY MODULE TO LOAD KEYS IN .env === dotenv
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule], // other modules that have wanted providers we want here
  controllers: [], // our AppControllers
  providers: [], // our AppServices
})
export class AppModule { }
