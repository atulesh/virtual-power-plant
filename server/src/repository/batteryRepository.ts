import BatteryModel, { Battery } from "../models/battery";

export const saveBatteryRepository = async (batteryData: Battery): Promise<void> => {
    try {
      const battery = new BatteryModel(batteryData);
      await battery.save();
    } catch (error) {
      console.error('Error saving battery to MongoDB:', error);
      throw error;
    }
};