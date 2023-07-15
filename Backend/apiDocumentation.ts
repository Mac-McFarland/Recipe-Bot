//Documentation for API endpoints with express swagger
import express, { Request, Response } from "express";

const router = express.Router();

//Get API routes and their descriptions
router.get('/recipes', (req: Request, res: Response) => {
    res.json({ message: "Endpoint that gets all recipes" });
});

router.post('/recipes', (req: Request, res: Response) => {
    res.json({ message: "Added a recipe from this endpoint" });
});

export default router;