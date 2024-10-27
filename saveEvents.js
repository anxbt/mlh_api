const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function saveEvents(events) {
    try {
        for (const event of events) {
            await prisma.mlh.create({
                data: {
                    details: event.details,
                    eventLogo: event.eventLogo,
                    additionalImage: event.additionalImage,
                },
            });
        }
        console.log('Events saved successfully');
    } catch (error) {
        console.error('Error saving events:', error);
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = { saveEvents };