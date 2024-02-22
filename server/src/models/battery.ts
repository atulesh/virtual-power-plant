import mongoose, {Document, Schema} from "mongoose";

export interface IBattery {
    name: string;
    postcode: number;
    wattCapacity: string;
}

export interface BatteryStatistic {
    totalWattCapacity?: number;
    averageWattCapacity?: number;
}

export interface IBatteryResponse{
    batteryList: IBattery[]; 
    batteryStats: BatteryStatistic 
}

export interface Battery extends Document, Omit<IBattery, 'totalWattCapacity' | 'averageWattCapacity'>{}

const BatterySchema = new Schema<Battery>({
    name: {type: String, required: true},
    postcode: {type: Number, required: true},
    wattCapacity: {type: String, required: true}
})

const BatteryModel = mongoose.model<Battery>('Battery', BatterySchema);
export default BatteryModel;