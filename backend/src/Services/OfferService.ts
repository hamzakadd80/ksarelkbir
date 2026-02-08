import prisma from '../config/prisma';

export class OfferService {
  public async getAllOffers() {
    return await prisma.offer.findMany({
      orderBy: { createdAt: 'desc' },
      include: { 
        user: { select: { fullName: true, phone: true } } 
      }
    });
  }

  public async createOffer(data: any) {
    return await prisma.offer.create({ data });
  }
}