import {Router} from 'express';
import { AuthenticateClientController } from './modules/accounts/authClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/accounts/authDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/CreateDeliveryController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/CreateDeliverymanController';


const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()

routes.post('/clients/login', authenticateClientController.handle)
routes.post('/deliverymen/login', authenticateDeliverymanController.handle)
routes.post('/clients', createClientController.handle)
routes.post('/deliverymen', createDeliverymanController.handle)
routes.post('/deliveries',  createDeliveryController.handle)

export {routes}