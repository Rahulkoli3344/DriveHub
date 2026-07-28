import axios from "axios";

const API = "https://localhost:7041/api/Construction";

// Get All Construction Vehicles
export const getConstruction = async () => {
    return await axios.get(API);
};

// Add Construction Vehicle
export const addConstruction = async (formData) => {
    return await axios.post(API, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Update Construction Vehicle
export const updateConstruction = async (id, formData) => {
    return await axios.put(`${API}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Delete Construction Vehicle
export const deleteConstruction = async (id) => {
    return await axios.delete(`${API}/${id}`);
};

// Get Construction Vehicle By Id
export const getConstructionById = async (id) => {
    return await axios.get(`${API}/${id}`);
};

// Delete All Construction Vehicles
export const deleteAllConstruction = async () => {
    return await axios.delete(`${API}/DeleteAll`);
};

export const getUserConstruction = (userId) =>
    axios.get(`${API}/user/${userId}`);
