import express from 'express'
import { getRequestList, handleRequest, removeRequest, submitRequest } from '../controllers/leaveRequestController.js'
import isAuthenticated from '../middleware/auth.js'

const leaveRouter = express.Router()


leaveRouter.post('/submit_request', isAuthenticated, submitRequest)
leaveRouter.post('/handle_request', isAuthenticated, handleRequest)
leaveRouter.get('/request_list', isAuthenticated, getRequestList)
leaveRouter.post('/removeRequest', isAuthenticated, removeRequest)


export default leaveRouter