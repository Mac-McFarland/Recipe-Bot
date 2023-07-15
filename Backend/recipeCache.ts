//Cache mechanism using Memcached to store frequently
//accessed recipes from the database and websites.

import { NextFunction, Request, Response } from 'express';
import Memcached from 'memcached';

const memcached = new Memcached('localhost:11211');

export function recipeCache(req: Request, res: Response, next: NextFunction) {
    const key = req.url;
    // See if data exists or is already cached, then go to next middleware in cache route
    memcached.get(key, (err, data) => {
      if (err) {
        console.error('Error retrieving value from cache: ' ,err);
        return next();
      }
      //If data is found, return it, if not, fetch it from the database
      if (data !== null) {
        res.json(JSON.parse(data));
      } else {
        next();
      }
    });
}

//Middleware caching a response from the server
export function cacheResponse(key:string, data:any, ttl:number) {
    memcached.set(key, JSON.stringify(data), ttl, (err) => {
        if (err) {
            console.error('Error setting value in cache: ', err);
        }
    });
}

export const cache = memcached;