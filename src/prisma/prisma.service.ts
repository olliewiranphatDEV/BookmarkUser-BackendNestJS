import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// THE LOGIC : CONNECT WITH DB - EXPORT THIS SERVICE TO USE OTHER MODULES TOO


@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({ // PrismaClient
            datasources: {
                db: {
                    url: "postgresql://myuser:mypassword@localhost:5432/bookmarkuser-nestjs-db"
                }
            }
        })
    }
}
