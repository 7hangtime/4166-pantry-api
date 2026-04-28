import prisma from '../config/db.js';

export async function createIngredient(data) {
    return prisma.ingredient.create({ data });
}

export async function getAllIngredients() {
    return prisma.ingredient.findMany();
}

export async function getIngredientById(id) {
    return prisma.ingredient.findUnique({ where: { id } });
}

export async function updateIngredient(id, data) {
    return prisma.ingredient.update({
        where: { id },
        data,
    });
}

export async function deleteIngredient(id) {
    return prisma.ingredient.delete({ where: { id } });
}