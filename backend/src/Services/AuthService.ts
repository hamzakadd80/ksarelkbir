import prisma from '../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Clé secrète pour signer les tokens (À mettre dans .env normalement)
const JWT_SECRET = 'TA_CLE_SECRETE_SUPER_SECURISEE'; 

export class AuthService {
  
  // INSCRIPTION
  public async register(data: any) {
    const { email, password, fullName, phone } = data;

    // 1. Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé.');
    }

    // 2. Hasher le mot de passe (Sécurité)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword, // On stocke le hash, pas le vrai mdp
        fullName,
        phone,
        role: 'USER'
      }
    });

    return user;
  }

  // CONNEXION
  public async login(data: any) {
    const { email, password } = data;

    // 1. Trouver l'utilisateur
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Email ou mot de passe incorrect.');
    }

    // 2. Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Email ou mot de passe incorrect.');
    }

    // 3. Générer un Token (Le passeport de l'utilisateur)
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d' // Le token expire dans 7 jours
    });

    // On retourne l'utilisateur (sans le mot de passe) et le token
    const { passwordHash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}