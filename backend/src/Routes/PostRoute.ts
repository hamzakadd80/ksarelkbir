import { Router } from 'express';
import { PostController } from '../Controllers/PostController';

const router = Router();
const postController = new PostController();

router.get('/', postController.getAll);
router.post('/', postController.create);
router.post('/comment', postController.comment);
router.post('/like', postController.like);

export default router;