import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global() // CAN USE EVERY OTHER MODULE - NO NEED TO IMPORT IT EVERTIME
@Module({
  providers: [PrismaService],
  exports: [PrismaService] // USE ANYWHERE OTHER MODULES
})
export class PrismaModule { }
