
import { hash } from "bcryptjs";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({username, password} : ICreateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({where: {
      username: {
        contains: username,
        mode: "insensitive" //Ignorando os valores em caixa alta ou caixa baixa
      }
    } })

    if(deliveryman){
      throw new Error("Deliveryman already exists!")
    }

    const hashedPassword = await hash(password, 10)

    const newDeliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashedPassword
      }
    })

    return newDeliveryman
  }
}