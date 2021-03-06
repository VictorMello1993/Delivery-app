import { prisma } from "../../../database/prismaClient";
import {sign} from 'jsonwebtoken';
import 'dotenv/config'
import { compare } from "bcryptjs";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase{
  async execute({username, password}: IAuthenticateClient){
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })    

    if(!client){
      throw new Error('Username or password invalid')
    }

    const passwordMatch = await compare(password, client.password)

    if(!passwordMatch){
      throw new Error('Username or password invalid')
    }    

    const token = sign({username}, process.env.SECRET_KEY_CLIENT as string, {
      subject: client.id,
      expiresIn: "1d"
    })

    return token
  }
}