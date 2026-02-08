import { Request, Response } from 'express';
import { AuthService } from '../Services/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({ message: 'Compte créé avec succès', user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await this.authService.login(req.body);
      res.json(data);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };
}