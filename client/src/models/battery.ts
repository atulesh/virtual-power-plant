interface IBattery{
    id: string;
    name: string;
    postcode: string;
    wattCapacity: string;
}

interface searchCriteria {
    searchTerm: string | undefined;
    postCodeStart: string | undefined;
    postCodeEnd: string | undefined;
  }

interface BatteryStatistic {
    totalWattCapacity: number;
    averageWattCapacity: number;
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

export type {IBattery , Battery, searchCriteria, IBatteryResponse, BatteryStatistic, SuccessResponse};