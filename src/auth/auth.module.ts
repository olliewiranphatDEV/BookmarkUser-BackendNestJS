import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
// import { PrismaModule } from "src/prisma/prisma.module";

// HERE FOR REGISTER!

@Module({
    // imports: [PrismaModule], // USE PrismaService
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { } // send out to register in the center modul AppModule