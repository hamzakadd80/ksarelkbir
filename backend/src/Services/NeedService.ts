import prisma from '../config/prisma';

export class NeedService {
  // Récupérer tous les besoins
  public async getAllNeeds() {
    return await prisma.need.findMany({
      orderBy: { createdAt: 'desc' },
      include: { 
        user: { select: { fullName: true, phone: true } } 
      }
    });
  }

  // Créer un besoin
  public async createNeed(data: any) {
    return await prisma.need.create({
      data
    });
  }
}