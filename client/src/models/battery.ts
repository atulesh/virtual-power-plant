interface IBattery{
    id: string;
    name: string;
    postcode: string;
    wattCapacity: string;
}

interface BatteryStatistic {
    totalWattCapacity?: number;
    averageWattCapacity?: number;
}

interface IBatteryResponse{
    batteryList: IBattery[]; 
    batteryStats: BatteryStatistic 
}

interface Battery extends Omit<IBattery, 'id'>{}

interface SuccessResponse{
    success: boolean;
    message: string;
}

export type {IBattery , Battery, IBatteryResponse, BatteryStatistic, SuccessResponse};