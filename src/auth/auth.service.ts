import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dtos";
import * as argon2 from 'argon2'

// FUNCTION OPERATION OF SERVER : CONNECT WITH DATABSE, EDITING FILED

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }


    async signup(dto: AuthDto) {

        console.log('dto >>', dto);
        console.log('email >>', dto.email);
        console.log('password >>', dto.password);

        // step 0 : may validate the duplicate user, is existing before?
        const dupUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        if (dupUser) {
            return {
                status: "Error", msg: "Already have this user in DB"
            }
        }

        // 1st: hashing password by argon2
        const hashPassword = await argon2.hash(dto.password)
        console.log('hashPassword >>', hashPassword);

        // 2nd: save/create the new user in the DB
        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password,
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
    }

    signin() {
        return {
            msg: "I have SignIn service "
        }
    }
}