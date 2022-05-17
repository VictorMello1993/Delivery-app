import { hash } from "bcryptjs";
import { prisma } from "../../../../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({username, password} : ICreateClient) {
    const client = await prisma.clients.findFirst({where: {
      username: {
        contains: username,
        mode: "insensitive" //Ignorando os valores em caixa alta ou caixa baixa        
      }
    } })

    console.log(client)

    if(client){
      throw new Error("Client already exists!")
    }

    const hashedPassword = await hash(password, 10)

    const newClient = await prisma.clients.create({
      data: {
        username,
        password: hashedPassword
      }
    })

    return newClient
  }
}