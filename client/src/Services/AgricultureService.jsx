import axios from "axios";

const API = "https://localhost:7041/api/Agriculture";

export const getAgriculture = async () => {
    return await axios.get(API);
};

export const addAgriculture = async (formData) => {
    return await axios.post(API, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateAgriculture = async (id, formData) => {
    return await axios.put(`${API}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteAgriculture = async (id) => {
    return await axios.delete(`${API}/${id}`);
};

export const getAgricultureById = async (id) => {
    return await axios.get(`${API}/${id}`);
};