import axios from "axios";
import { API_BASE_URL } from "../constant";
import { Battery, IBattery, IBatteryResponse, SuccessResponse } from "../models/battery";

export const getBatteryList = async (searchCriteria?: any): Promise<IBatteryResponse> => {
    try {
      let url = `${API_BASE_URL}/fetchBatteries`;
      if (searchCriteria) {
        url += `?${new URLSearchParams(searchCriteria).toString()}`;
    }
    const response = await axios.get(url);
    return response.data;
    } catch (error) {
      console.error('Error fetching batteries:', error);
      throw error;
    }
};

export const addBattery = async (batteryData: Battery): Promise<SuccessResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/addBattery`, batteryData);
        return response.data;
    } catch (error) {
        console.error('Error in addBattery:', error);
        throw error;
    }
}
