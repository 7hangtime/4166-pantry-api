import prisma from '../config/db.js';

export async function createPantryItem(data) {
    return prisma.pantryItem.create({ data });
}

export async function getPantryItemsByUserId(userId) {
    return prisma.pantryItem.findMany({
        where: { userId },
    });
}

export async function getPantryItemById(id) {
    return prisma.pantryItem.findUnique({
        where: { id },
    });
}

export async function updatePantryItem(id, data) {
    return prisma.pantryItem.update({
        where: { id },
        data,
    });
}

export async function deletePantryItem(id) {
    return prisma.pantryItem.delete({
        where: { id },
    });
}