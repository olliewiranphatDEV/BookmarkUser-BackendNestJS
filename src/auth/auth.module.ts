import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
// import { PrismaModule } from "src/prisma/prisma.module";

// HERE FOR REGISTER!

@Module({
    // imports: [PrismaModule], // USE PrismaService // MOVE TO USE IN GLOBALLY AppModule
    imports: [JwtModule], // FOR USE JwtService in AuthService
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { } // send out to register in the center modul AppModule