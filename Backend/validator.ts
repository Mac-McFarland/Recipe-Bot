//Validate the middleware during request processing
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export function validator(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are errors, send a bad request
        return res.status(400).json({ errors: errors.array() });
    }
    // If there are no errors, continue to the next middleware
    next();
}
