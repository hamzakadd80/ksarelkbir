import { Router } from 'express';
import { OfferController } from '../Controllers/OfferController';

const router = Router();
const offerController = new OfferController();

router.get('/', offerController.getAll);
router.post('/', offerController.create);

export default router;