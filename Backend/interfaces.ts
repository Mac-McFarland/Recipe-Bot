import { Document } from "mongoose";

interface Recipe{
    title: string;
    ingredients: string[];
    instructions: string;
    createdAt: string;
    updatedAt: string;
}

interface RecipeDocument extends Document {
    title: string;
    ingredients: string[];
    instructions: string;
    createdAt: Date;
    updatedAt: Date;
}

export { Recipe, RecipeDocument };
