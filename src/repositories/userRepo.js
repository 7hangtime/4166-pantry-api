import prisma from '../config/db.js';

export async function createUser(data) {
    try {
        const newUser = await prisma.user.create({
            data,
            omit: { password: true },
        });
        return newUser;
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('Username has already been used');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function findUserByUsername(username) {
    return prisma.user.findUnique({ where: { username } });
}