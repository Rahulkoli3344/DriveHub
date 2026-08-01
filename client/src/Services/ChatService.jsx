import axios from "axios";

const API = "https://localhost:7041/api/Chat";

export const searchVehicle = async (vehicleName, location) => {
    const response = await axios.post(`${API}/search`, {
        vehicleName,
        location,
    });

    return response.data;
};