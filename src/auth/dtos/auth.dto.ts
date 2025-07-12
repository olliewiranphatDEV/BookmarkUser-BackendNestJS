import { IsEmail, IsNotEmpty, IsString } from 'class-validator'



export class AuthDto { // DON'T FORGET TO EXPORT IT
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    firstName: string

    @IsString()
    lastName: string
}