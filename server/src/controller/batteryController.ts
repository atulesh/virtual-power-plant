import { Request, Response } from 'express';
import { Battery } from '../models/battery';
import { getBatteriesService, saveBatteryService } from "../service/batteryService";

export const getBatteries = async (req: Request, res: Response): Promise<void> => {
  try {
    const {postCodeStart, postCodeEnd, searchTerm} = req.query;
    const query: any = {};
    if (postCodeStart && postCodeEnd) {
      const start = Number(postCodeStart);
      const end = Number(postCodeEnd);
      if (!isNaN(start) && !isNaN(end)) {
        query.postcode = { $gte: start, $lte: end };
      }
    }
    if(searchTerm){
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } }
      ];
    }
    const batteries = await getBatteriesService(query);
    res.json(batteries);
  } catch (error) {
    console.error('Error fetching batteries from db:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addBattery = async (req: Request, res: Response): Promise<void> => {
    try {
      const batteryBody: Battery = req.body;
      await saveBatteryService(batteryBody);
      res.status(201).json({success: true, message: 'Battery added successfully' });
    } catch (error) {
      console.error('Error saving battery:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};