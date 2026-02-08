import { Request, Response } from 'express';
import { PostService } from '../Services/PostService';

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const posts = await this.postService.getAllPosts();
      res.json(posts);
    } catch (e) {
      res.status(500).json({ error: 'Erreur chargement posts' });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const { userId, content, imageUrl } = req.body; // <-- Récupère imageUrl
      const post = await this.postService.createPost(userId, content, imageUrl);
      res.status(201).json(post);
    } catch (e) {
      res.status(500).json({ error: 'Erreur création post' });
    }
  };

  public comment = async (req: Request, res: Response) => {
    try {
      const { userId, postId, content, parentId } = req.body; // <-- Récupère parentId
      const comment = await this.postService.addComment(userId, postId, content, parentId);
      res.json(comment);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Erreur commentaire' });
    }
  };

  public like = async (req: Request, res: Response) => {
    try {
      const { userId, postId } = req.body;
      const result = await this.postService.toggleLike(userId, postId);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: 'Erreur like' });
    }
  };
}