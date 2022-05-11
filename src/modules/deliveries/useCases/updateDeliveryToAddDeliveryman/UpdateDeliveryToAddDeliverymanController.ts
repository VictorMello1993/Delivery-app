import {Request, Response} from 'express';
import { UpdateDeliveryToAddDeliverymanUseCase } from './updateDeliveryToAddDeliverymanUseCase';

export class UpdateDeliveryToAddDeliverymanController {
 async handle(req: Request, res: Response) {
   const {id} = req.params
   const {id_deliveryman} = req

   const updateDeliveryToAddDeliverymanUseCase = new UpdateDeliveryToAddDeliverymanUseCase()

   const result = await updateDeliveryToAddDeliverymanUseCase.execute({id_delivery: id, id_deliveryman})

   return res.status(201).json(result)
 }
}