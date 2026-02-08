import { Router } from 'express';
import needRoutes from './NeedRoute';
import offerRoutes from './OfferRoute'; // <-- Import
import authroute from './AuthRoute'; // <-- Import
import posts from './PostRoute'; // <-- Import

const router = Router();

router.use('/needs', needRoutes);
router.use('/offers', offerRoutes); // <-- Ajout
router.use('/auth', authroute); // <-- Ajout
router.use('/posts', posts); // <-- Ajout


export default router;