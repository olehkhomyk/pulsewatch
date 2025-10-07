import { prisma } from '../../db/prisma.js';

export const userRepo = {
    findAll: () => prisma.user.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } }),
};
