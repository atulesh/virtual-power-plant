import { Battery } from "./models/battery";

export const getStatisticValues = (batteryList: Battery[]): { totalWattCapacity: number; averageWattCapacity: number } => {
    const totalWattCapacity = batteryList.reduce((sum, battery) => sum + parseInt(battery.wattCapacity, 10) || 0, 0);
    const averageWattCapacity = parseFloat((totalWattCapacity / batteryList.length).toFixed(2)) || 0.0;
    return { totalWattCapacity, averageWattCapacity };
};