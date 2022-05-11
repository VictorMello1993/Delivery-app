import {Router} from 'express';
import { ensureClientAuthenticated } from './middlewares/ensureClientAuthenticated';
import { AuthenticateClientController } from './modules/accounts/authClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/accounts/authDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()

routes.post('/clients/login', authenticateClientController.handle)
routes.post('/deliverymen/login', authenticateDeliverymanController.handle)
routes.post('/clients', createClientController.handle)
routes.post('/deliverymen', createDeliverymanController.handle)
routes.post('/deliveries', ensureClientAuthenticated, createDeliveryController.handle)
routes.get('/deliveries/available', findAllAvailableController.handle)

export {routes}