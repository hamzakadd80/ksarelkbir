console.log("⏳ Démarrage du script..."); // AJOUTE CETTE LIGNE
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // 1. Créer un utilisateur fictif
    const user = await prisma.user.create({
        data: {
            email: 'ahmed@ksarentraide.ma',
            passwordHash: 'hashed_password_secure', // En vrai, il faudrait hasher
            fullName: 'Ahmed El Kasri',
            role: 'USER',
        },
    });

    // 2. Créer des Besoins
    await prisma.need.createMany({
        data: [
            {
                title: 'Besoin urgent de couvertures',
                description: 'Famille de 5 personnes sans abri après les inondations.',
                category: 'VETEMENTS',
                urgency: 5,
                status: 'EN_ATTENTE',
                locationName: 'Quartier Al Massira',
                contactPhone: '0600000000',
                userId: user.id,
            },
            {
                title: 'Insuline pour diabétique',
                description: 'Besoin urgent d\'insuline Lantus.',
                category: 'SANTE',
                urgency: 5,
                status: 'EN_COURS',
                locationName: 'Centre ville',
                contactPhone: '0611111111',
                userId: user.id,
            },
        ],
    });

    // 3. Créer des Offres
    await prisma.offer.create({
        data: {
            title: 'Transport disponible 4x4',
            description: 'Je peux transporter des vivres vers les zones inondées.',
            category: 'LOGISTIQUE',
            status: 'DISPONIBLE',
            locationName: 'Sortie de ville',
            userId: user.id,
        },
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });