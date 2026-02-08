import { Request, Response } from 'express';
import { NeedService } from '../Services/NeedService';

export class NeedController {
  private needService: NeedService;

  constructor() {
    this.needService = new NeedService();
  }

  // GET /api/needs
  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const needs = await this.needService.getAllNeeds();
      res.json(needs);
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur lors de la récupération' });
    }
  };

  // POST /api/needs
  public create = async (req: Request, res: Response): Promise<void> => {
  try {
    // On récupère tout le corps de la requête
    // userId sera "undefined" si l'utilisateur n'est pas connecté, et c'est OK maintenant !
    const { title, description, category, urgency, locationName, contactPhone, contactName, userId } = req.body;

    const newNeed = await this.needService.createNeed({
      title,
      description,
      category,
      urgency: Number(urgency), // On s'assure que c'est un nombre
      locationName,
      contactPhone,
      contactName, // On enregistre le nom saisi manuellement
      userId: userId || null // Si pas d'ID, on met null
    });
    
    res.status(201).json(newNeed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
};
}