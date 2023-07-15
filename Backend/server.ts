import axios from "axios";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import apiDocumentation from "./apiDocumentation";
import { mongoURI } from "./config";
import { Recipe } from "./recipe";

import appLogger from "./appLogger";
import { logError } from "./bugTracker";
import { errorHandler } from './errorHandler';
import { recipeCache } from "./recipeCache";
import { recipeValidator } from "./recipeValidator";

const app = express();
const port = 3000;

// Set MongoDB connection options
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 5000,
  };

// Connect to MongoDB server
mongoose.connect(mongoURI, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB: ", err);
  });

//Mount API documentation server
app.use('/docs', apiDocumentation);

// Register the error handling middleware
app.use(errorHandler);

// Apply validation middleware to the route and handle the request
app.post('/recipes', errorHandler, recipeValidator, (req, res) => {
  // Handle the request
  res.json({ message: "Recipe added" });
});

//Logger for routes and middleware errors
app.get('/recipes', (req, res) => {
  // Log request
  appLogger.info('Request received, endpoint accessed: ');
  // Handle the request
  res.json({ message: "Recipe added" });
});

// Routes
app.get('/recipes', async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Couldn't retrieve recipes" });
    // Log error
    console.error("Error logged for failed retrieval: ", err);
  }
});

// Unit test
app.get('/test', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
    const data = response.data;
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Couldn't retrieve recipes" });
    // Log error
    console.error("Error logged for failed retrieval: ", err);
    // Send error to bug tracker
    sendErrorToBugTracker(err);
  }

  //Use recipeCache to routes for any caching requests needed
  app.get('/recipes', recipeCache, async (req: Request, res: Response) => {
    try {
      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ message: "Couldn't retrieve recipes from cache route." });
      console.error("Error logged for failed retrieval in cache:", err);
    }
  });

  //Use bugTracker to record and retrieve bugs
  app.get('/recipes', recipeCache, async (req: Request, res: Response) => {
    try {
      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ message: "Couldn't retrieve recipes from cache route." });
      logError(err);
      sendErrorToBugTracker(err);
    }
  });

  function sendErrorToBugTracker(err: Error) {
    // Send error to bug tracker
    console.log("Error sent to bug tracker");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
