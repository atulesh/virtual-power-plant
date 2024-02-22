import express from "express"
import { addBattery, getBatteries } from "./controller/batteryController";

const routes = express.Router();
routes.get('/fetchBatteries', getBatteries);
routes.post('/addBattery', addBattery);

export default routes;