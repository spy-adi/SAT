import * as express from 'express';
import { isAuthorized } from '../middleware/isAuthorized.js';
import * as userController from '../controller/user.controller.js';

const router = express.Router();

router.get('/', isAuthorized, userController.fetchAllUsers);
router.post('/', userController.createUser);
router.get('/:userId', isAuthorized,userController.fetchUserById);

export default router;