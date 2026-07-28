import axios from "axios";

const API = "https://localhost:7041/api/Emergency";

export const getEmergency = async () => {
    return await axios.get(API);
};

export const addEmergency = async (formData) => {
    return await axios.post(API, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateEmergency = async (id, formData) => {
    return await axios.put(`${API}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteEmergency = async (id) => {
    return await axios.delete(`${API}/${id}`);
};

export const getEmergencyById = async (id) => {
    return await axios.get(`${API}/${id}`);
};

export const deleteAllEmergency = async () => {
    return await axios.delete(`${API}/DeleteAll`);
};

export const getUserEmergency = (userId) =>
    axios.get(`${API}/user/${userId}`);