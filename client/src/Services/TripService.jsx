    import axios from "axios";

    const API = "https://localhost:7041/api/Trips";

    export const getTrips = async () => {
        return await axios.get(API);
    };

    export const addTrip = async (formData) => {
        return await axios.post(API, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    export const updateTrip = async (id, formData) => {
        return await axios.put(`${API}/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    export const deleteTrip = async (id) => {
        return await axios.delete(`${API}/${id}`);
    };

    export const getTripById = async (id) => {
        return await axios.get(`${API}/${id}`);
    };