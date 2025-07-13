import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

// THE LOGIC : CONNECT WITH DB - EXPORT THIS SERVICE TO USE OTHER MODULES TOO


@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        console.log('config.get("DATABASE_URL") >>', config.get("DATABASE_URL"));

        super({ // PrismaClient
            datasources: {
                db: {
                    url: config.get("DATABASE_URL") // IN .env ;register config in app.module.ts
                    // url: "postgresql://myuser:mypassword@localhost:5432/bookmarkuser-nestjs-db" // HARD-CODE
                }
            }
        })
    }
}
