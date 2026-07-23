import axios from "axios";

const API = "https://localhost:7041/api/Trips";

export const getTrips = async () => {
    return await axios.get(API);
};

export const addTrip = async (trip) => {
    return await axios.post(API, trip);
};

export const updateTrip = async (id, trip) => {
    return await axios.put(`${API}/${id}`, trip);
};

export const deleteTrip = async (id) => {
    return await axios.delete(`${API}/${id}`);
};