import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dtos";
import * as argon2 from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

// FUNCTION OPERATION OF SERVER : CONNECT WITH DATABSE, EDITING FILED

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }


    async signup(dto: AuthDto) {

        console.log('dto >>', dto);
        console.log('email >>', dto.email);
        console.log('password >>', dto.password);

        try {
            // step 0 : may validate the duplicate user, is existing before?
            // const dupUser = await this.prisma.user.findUnique({
            //     where: {
            //         email: dto.email
            //     }
            // })
            // if (dupUser) {
            //     return {
            //         status: "Error", msg: "Already have this user in DB"
            //     }
            // }

            // 1st: hashing password by argon2
            const hashPassword = await argon2.hash(dto.password)
            console.log('hashPassword >>', hashPassword);

            // 2nd: save/create the new user in the DB
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashPassword,
                    firstName: dto.firstName,
                    lastName: dto.lastName
                }
            })
            console.log('newUser >>', newUser);

            // 3rd: return the saved user without password to FE
            const { password, ...newUserData } = newUser

            return {
                status: "Success",
                msg: "I have SignUp service ",
                results: newUserData
            }
        } catch (error) {
            console.log("Signup Error", error);
            if (error.code === "P2002") { // DUPLICATED EMIAL : VALIDATED BY PRISMA
                throw new ForbiddenException("Credentials taken")
            }
            throw error
        }
    }

    async signin(dto: AuthDto) {
        console.log('dto >>', dto);
        console.log('email >>', dto.email);
        console.log('password >>', dto.password);
        try {
            // 1st : the existing user by incoming dto.email
            const existingUser = await this.prisma.user.findUnique({
                where: { email: dto.email }
            })
            if (!existingUser) {
                throw new ForbiddenException("Credential incorrect") // Not found this user in DB
            }
            console.log('existingUser >>', existingUser);

            // FOUND THE EXISTING USER : COMPARE THE PASSWORD BY ARGON2
            const comparePasswords = await argon2.verify(existingUser.password, dto.password)
            if (!comparePasswords) {
                throw new ForbiddenException("Password incorrect")
            }
            console.log('comparePasswords >>', comparePasswords);

            // SEND THE USER DATA OUT : WITHOUT PASSWORD
            const { password, ...userData } = existingUser


            return this.signinToken(userData)


        } catch (error) {
            console.error("Signin Error:", error);
            throw error;
        }
    }

    async signinToken(userData: any) {


        const jwt_secret = this.config.get("JWT_SECRET")
        console.log('jwt_secret >>', jwt_secret);


        const token = await this.jwt.sign(userData, {
            expiresIn: '15m', // BEING IN THE APP 15 MINS ;AFTER THAT NEED TO SIGNIN AGAIN
            secret: jwt_secret
        })

        return {
            msg: "I have SignIn service ",
            token,
            userData
        }
    }
}