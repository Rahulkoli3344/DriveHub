import axios from "axios";

const API = "https://localhost:7041/api/RentalCar";


export const getRentalCars = async () => {
    return await axios.get(API);
};



export const addRentalCar = async (formData) => {
    return await axios.post(API, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};



export const updateRentalCar = async (id, formData) => {
    return await axios.put(`${API}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};



export const deleteRentalCar = async (id) => {
    return await axios.delete(`${API}/${id}`);
};



export const getRentalCarById = async (id) => {
    return await axios.get(`${API}/${id}`);
};



export const getUserRentalCars = (userId) =>
    axios.get(`${API}/user/${userId}`);