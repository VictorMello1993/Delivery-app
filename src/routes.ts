import {Router} from 'express';
import { ensureClientAuthenticated } from './middlewares/ensureClientAuthenticated';
import { ensureDeliverymanAuthenticated } from './middlewares/ensureDeliverymanAuthenticated';
import { AuthenticateClientController } from './modules/accounts/authClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/accounts/authDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { FindAllDeliveriesController } from './modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { UpdateDeliveryToAddDeliverymanController } from './modules/deliveries/useCases/updateDeliveryToAddDeliveryman/updateDeliveryToAddDeliverymanController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()
const updateDeliveryToAddDeliverymanController = new UpdateDeliveryToAddDeliverymanController()
const findAllDeliveriesController = new FindAllDeliveriesController()

routes.post('/clients/login', authenticateClientController.handle)
routes.post('/deliverymen/login', authenticateDeliverymanController.handle)
routes.post('/clients', createClientController.handle)
routes.post('/deliverymen', createDeliverymanController.handle)
routes.post('/deliveries', ensureClientAuthenticated, createDeliveryController.handle)
routes.get('/deliveries/available', ensureDeliverymanAuthenticated, findAllAvailableController.handle)
routes.put('/deliveries/updateDelivery/:id', ensureDeliverymanAuthenticated, updateDeliveryToAddDeliverymanController.handle)
routes.get('/clients/deliveries/', ensureClientAuthenticated, findAllDeliveriesController.handle)

export {routes}