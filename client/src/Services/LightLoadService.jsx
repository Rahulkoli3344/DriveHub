import axios from "axios";

const API = "https://localhost:7041/api/LightLoad";

export const getLightLoads = async () => {
    return await axios.get(API);
};

export const addLightLoad = async (formData) => {
    return await axios.post(API, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateLightLoad = async (id, formData) => {
    return await axios.put(`${API}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteLightLoad = async (id) => {
    return await axios.delete(`${API}/${id}`);
};

export const getLightLoadById = async (id) => {
    return await axios.get(`${API}/${id}`);
};

export const getUserLightLoads = (userId) =>
    axios.get(`${API}/user/${userId}`);