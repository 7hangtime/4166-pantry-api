import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
    await prisma.$queryRaw`TRUNCATE recipe_ingredients, pantry_items, recipes, ingredients, users RESTART IDENTITY CASCADE;`;

    const usersData = [
        { username: 'alice', password: 'alice1234' },
        { username: 'bob', password: 'bob1234' },
        { username: 'charlie', password: 'charlie1234', role: 'ADMIN' },
    ];

    const users = [];

    for (const userData of usersData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await prisma.user.create({
            data: {
                username: userData.username,
                password: hashedPassword,
                role: userData.role || 'USER',
            },
        });

        users.push(user);
    }

    const ingredients = await prisma.ingredient.createManyAndReturn({
        data: [
            { name: 'Eggs', category: 'Protein', defaultUnit: 'count' },
            { name: 'Milk', category: 'Dairy', defaultUnit: 'cups' },
            { name: 'Rice', category: 'Grain', defaultUnit: 'cups' },
            { name: 'Chicken Breast', category: 'Protein', defaultUnit: 'lbs' },
            { name: 'Cheddar Cheese', category: 'Dairy', defaultUnit: 'cups' },
            { name: 'Tortilla', category: 'Grain', defaultUnit: 'count' },
        ],
    });

    const ingredientMap = {};
    for (const ingredient of ingredients) {
        ingredientMap[ingredient.name] = ingredient;
    }

    const recipes = await prisma.recipe.createManyAndReturn({
        data: [
            {
                title: 'Scrambled Eggs',
                instructions: 'Beat eggs with milk, then cook in a pan until firm.',
                prepTime: 5,
                cookTime: 5,
            },
            {
                title: 'Chicken and Rice',
                instructions: 'Cook rice, grill chicken, and serve together.',
                prepTime: 10,
                cookTime: 25,
            },
            {
                title: 'Cheese Quesadilla',
                instructions: 'Place cheese inside tortilla and cook until melted.',
                prepTime: 5,
                cookTime: 8,
            },
        ],
    });

    const recipeMap = {};
    for (const recipe of recipes) {
        recipeMap[recipe.title] = recipe;
    }

    await prisma.recipeIngredient.createMany({
        data: [
            {
                recipeId: recipeMap['Scrambled Eggs'].id,
                ingredientId: ingredientMap['Eggs'].id,
                amount: 3,
                unit: 'count',
            },
            {
                recipeId: recipeMap['Scrambled Eggs'].id,
                ingredientId: ingredientMap['Milk'].id,
                amount: 0.25,
                unit: 'cups',
            },
            {
                recipeId: recipeMap['Chicken and Rice'].id,
                ingredientId: ingredientMap['Chicken Breast'].id,
                amount: 1,
                unit: 'lbs',
            },
            {
                recipeId: recipeMap['Chicken and Rice'].id,
                ingredientId: ingredientMap['Rice'].id,
                amount: 2,
                unit: 'cups',
            },
            {
                recipeId: recipeMap['Cheese Quesadilla'].id,
                ingredientId: ingredientMap['Tortilla'].id,
                amount: 2,
                unit: 'count',
            },
            {
                recipeId: recipeMap['Cheese Quesadilla'].id,
                ingredientId: ingredientMap['Cheddar Cheese'].id,
                amount: 1,
                unit: 'cups',
            },
        ],
    });

    for (const user of users) {
        await prisma.pantryItem.createMany({
            data: [
                {
                    userId: user.id,
                    ingredientId: ingredientMap['Eggs'].id,
                    quantity: 12,
                    unit: 'count',
                },
                {
                    userId: user.id,
                    ingredientId: ingredientMap['Rice'].id,
                    quantity: 4,
                    unit: 'cups',
                },
                {
                    userId: user.id,
                    ingredientId: ingredientMap['Milk'].id,
                    quantity: 2,
                    unit: 'cups',
                },
            ],
        });
    }

    console.log('Seed completed successfully!');
} catch (error) {
    console.error('Seed failed:', error);
} finally {
    await prisma.$disconnect();
}