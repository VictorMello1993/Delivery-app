import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";
import 'dotenv/config'
import { compare } from "bcryptjs";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase{
  async execute({username, password}: IAuthenticateDeliveryman){
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })    

    if(!deliveryman){
      throw new Error('Username or password invalid')
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if(!passwordMatch){
      throw new Error('Username or password invalid')
    }    

    const token = sign({username}, process.env.SECRET_KEY_DELIVERYMAN as string, {
      subject: deliveryman.id,
      expiresIn: "1d"
    })

    return token
  }
}