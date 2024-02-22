import BatteryModel, { Battery, IBattery } from "../models/battery";
import { saveBatteryRepository } from "../repository/batteryRepository";
import { getStatisticValues } from "../utils";

export const getBatteryStatisticsService = async (queryParams: any): Promise<any> => {
  try {
      const batteries: Battery[] = await BatteryModel.find(queryParams);
      const totalWattCapacity = batteries.reduce((sum, battery) => sum + parseInt(battery.wattCapacity), 0);
      const averageWattCapacity = parseFloat((totalWattCapacity / batteries.length).toFixed(2));
      return {
          totalWattCapacity: totalWattCapacity,
          averageWattCapacity: averageWattCapacity,
      };
  } catch (error) {
      console.error('Error fetching battery statistics:', error);
      throw error;
  }
};

export const getBatteriesService = async (query: any): Promise<any> => {
  try {
    let batteryList: Battery[];
    if(Object.keys(query).length === 0){
      batteryList = await BatteryModel.find().sort({ name: 'asc' });
    }
    else{
      batteryList = await BatteryModel.find(query).sort({ name: 'asc' });
    }
    const {totalWattCapacity, averageWattCapacity} = getStatisticValues(batteryList);
    return {
        batteryList, 
        batteryStats: {
          totalWattCapacity,
          averageWattCapacity,
        }
    };
  } catch (error) {
    console.error('Error fetching batteries:', error);
    throw error;
  }
}

export const saveBatteryService = async (batteryData: Battery): Promise<void> => {
    try {
      await saveBatteryRepository(batteryData);
    } catch (error) {
      console.error('Error adding battery:', error);
      throw error;
    }
  };