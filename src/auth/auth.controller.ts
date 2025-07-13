import { Body, Controller, Get, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDto } from "./dtos"; // ACCESS VIA index.ts

// HANDLE WITH : req-res HTTP methods

@Controller('auth') // http://localhost:3333/auth
export class AuthController {

    // CRAETE INSTANCE AND IMPORT AUTHSERVICE 
    constructor(private authService: AuthService) { }

    @Get('/')
    greeting() {
        return "Hello, auth"
    }


    // FUNCTION API
    // @Post('signup') // POST /auth/signup 
    // signup(
    //     @Body('email') email: string,
    //     @Body('password', ParseIntPipe) password: string) { // FOR USE ANMY FRAMEWORK : EXPRESS/FASTIFY

    //     console.log({
    //         email,
    //         password
    //     });
    //     // return "I am SignUp!"
    //     // return {
    //     //     msg: "I am SignUp"
    //     // }
    //     return this.authService.signup() // CALL TO USE THE FUNCTION IN SERVICE
    // }

    @Post('signup') // POST /auth/signup 
    signup(@Body() dto: AuthDto) { // FOR USE ANMY FRAMEWORK : EXPRESS/FASTIFY

        // console.log("dto", dto);
        // return "I am SignUp!"
        // return {
        //     msg: "I am SignUp"
        // }
        return this.authService.signup(dto) // CALL TO USE THE FUNCTION IN SERVICE
    }

    @Post('signin') // POST /auth/signip 
    signin(@Body() dto: AuthDto) {
        // return "I am SignIn!"
        return this.authService.signin(dto) // CALL TO USE THE FUNCTION IN SERVICE
    }

}