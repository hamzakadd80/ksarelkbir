import { Router } from 'express';
import { NeedController } from '../Controllers/NeedController';

const router = Router();
const needController = new NeedController();

router.get('/', needController.getAll);
router.post('/', needController.create);

export default router;