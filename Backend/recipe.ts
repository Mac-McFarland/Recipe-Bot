
import mongoose, { Schema } from "mongoose";
import { RecipeDocument } from "./interfaces";

const recipeSchema = new Schema<RecipeDocument>({

    title:{
        type: "string",
        required: true,
        unique: true
    },
    ingredients:{
        type: ["string"],
        required: true
    },
    instructions:{
        type: "string",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        required: true
    },
    updatedAt:{
        type: Date,
        default: Date.now(),
        required: true
    },
});


const Recipe = mongoose.model<RecipeDocument>('Recipe', recipeSchema);

export { Recipe, RecipeDocument };
