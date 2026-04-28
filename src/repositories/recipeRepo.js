import prisma from '../config/db.js';

export async function createRecipe(data) {
    return prisma.recipe.create({ data });
}

export async function getAllRecipes() {
    return prisma.recipe.findMany();
}

export async function getRecipeById(id) {
    return prisma.recipe.findUnique({ where: { id } });
}

export async function updateRecipe(id, data) {
    return prisma.recipe.update({
        where: { id },
        data,
    });
}

export async function deleteRecipe(id) {
    return prisma.recipe.delete({ where: { id } });
}