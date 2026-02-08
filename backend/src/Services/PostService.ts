import prisma from '../config/prisma';

export class PostService {
  
  // 1. Récupérer tous les posts (On inclut les replies)
  public async getAllPosts() {
    return await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, fullName: true, avatarUrl: true } },
        likes: true,
        comments: {
          include: { 
            user: { select: { id: true, fullName: true } },
            // On pourrait inclure les replies ici, mais on va gérer ça à plat ou dans le modal
          },
          orderBy: { createdAt: 'asc' }
        },
      }
    });
  }

  // 2. Créer un post AVEC IMAGE
  public async createPost(userId: string, content: string, imageUrl?: string) {
    return await prisma.post.create({
      data: { userId, content, imageUrl } // <-- Ajout imageUrl
    });
  }

  // 3. Ajouter un commentaire OU UNE RÉPONSE
  public async addComment(userId: string, postId: string, content: string, parentId?: string) {
    return await prisma.comment.create({
      data: { 
        userId, 
        postId, 
        content,
        parentId: parentId || null // <-- Ajout parentId
      },
      include: {
        user: { select: { id: true, fullName: true } } // Pour renvoyer l'auteur tout de suite
      }
    });
  }

  // ... (Garde la méthode toggleLike telle quelle) ...
  public async toggleLike(userId: string, postId: string) {
     // ... (ton code existant)
     const existingLike = await prisma.like.findUnique({
      where: { postId_userId: { postId, userId } }
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      return { status: 'disliked' };
    } else {
      await prisma.like.create({ data: { postId, userId } });
      return { status: 'liked' };
    }
  }
}