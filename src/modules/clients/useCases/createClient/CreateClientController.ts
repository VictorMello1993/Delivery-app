import { CreateClientUseCase } from "./CreateClientUseCase";
import {Request, Response} from 'express';

export class CreateClientController {
  async handle(req: Request, res: Response) {
    const {username, password} = req.body

    const createClienteUseCase = new CreateClientUseCase()

    const result = await createClienteUseCase.execute({
      username,
      password
    })

    return res.json(result)
  }
}