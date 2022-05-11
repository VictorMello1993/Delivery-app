import {NextFunction, Request, Response} from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureDeliverymanAuthenticated(req: Request, res: Response, next: NextFunction){
  const authHeader = req.headers.authorization

  //Verificar se o entregador possui token
  if(!authHeader){
    return res.status(401).json({
      message: 'Token missing'
    })
  }

  //Verificar se o token é válido
  const [, token] = authHeader.split(' ') //Bearer Token
  
  try {
    const {sub} = verify(token, process.env.SECRET_KEY_DELIVERYMAN as string) as IPayload

    //Sobrescrevendo a tipagem do Express para adicionar a propriedade id_deliveryman e atribuí-lo ao request
    req.id_deliveryman = sub 

    return next()
  } 
  catch (error) {
    return res.status(401).json({
      message: 'Invalid token'
    })
  }
}