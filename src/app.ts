import "express-async-errors";
import express from "express";
import cors from 'cors';
import { config } from "./config/config.service";
import apiRoutes from './routes';
import { errorsHandlermiddleware, notFoundMiddleware } from "./middelwares";

export const app = express();
/** Middelwares */
app.use(cors({
    origin :config.ORIGIN 
}));
app.use(express.json());

/** Routes */
app.use('/api',apiRoutes)

/** Custom Middelwares */
app.use(errorsHandlermiddleware);
app.use(notFoundMiddleware);
