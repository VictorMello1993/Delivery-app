import {Request, Response} from 'express'
import { UpdateEndDateUseCase } from './UpdateEndDateUseCase'

export class UpdateEndDateController {
  async handle(req: Request, res: Response){
    const {id_deliveryman} = req
    const {id} = req.params

    const updateEndDateUseCase = new UpdateEndDateUseCase()

    const result = await updateEndDateUseCase.execute({id_deliveryman, id_delivery: id})

    return res.status(201).json(result)
  }
}