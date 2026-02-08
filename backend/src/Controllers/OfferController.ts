import { Request, Response } from 'express';
import { OfferService } from '../Services/Offerservice';

export class OfferController {
  private offerService: OfferService;

  constructor() {
    this.offerService = new OfferService();
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const offers = await this.offerService.getAllOffers();
      res.json(offers);
    } catch (error) {
      res.status(500).json({ error: 'Erreur récupération offres' });
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, description, category, locationName, contactPhone, contactName, userId } = req.body;
      
      const newOffer = await this.offerService.createOffer({
        title,
        description,
        category,
        locationName,
        contactPhone,
        contactName,
        userId: userId || null
      });
      res.status(201).json(newOffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur création offre' });
    }
  };
}