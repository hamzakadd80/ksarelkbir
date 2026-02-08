import { Router } from 'express';
import needRoutes from './NeedRoute';
import offerRoutes from './OfferRoute'; // <-- Import

const router = Router();

router.use('/needs', needRoutes);
router.use('/offers', offerRoutes); // <-- Ajout

export default router;