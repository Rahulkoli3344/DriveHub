import axios from "axios";

const API = "https://localhost:7041/api/HeavyLoad";


export const getHeavyLoads = async () => {
    return await axios.get(API);
};


export const addHeavyLoad = async (formData) => {
    return await axios.post(API, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


export const updateHeavyLoad = async (id, formData) => {
    return await axios.put(`${API}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


export const deleteHeavyLoad = async (id) => {
    return await axios.delete(`${API}/${id}`);
};


export const getHeavyLoadById = async (id) => {
    return await axios.get(`${API}/${id}`);
};


export const getUserHeavyLoads = (userId) =>
    axios.get(`${API}/user/${userId}`);