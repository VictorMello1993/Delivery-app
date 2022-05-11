import { prisma } from "../../../../database/prismaClient"

interface IFindAllDeliveriesDeliverymanUseCase{
  id_deliveryman: string
}

export class FindAllDeliveriesDeliverymanUseCase {
  async execute({id_deliveryman}: IFindAllDeliveriesDeliverymanUseCase){
    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman
      },
      select: {
        id: true,
        username: true,
        Deliveries: true,
      }
    })

    return deliveries
  }
}