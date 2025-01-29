import axios from "axios";

export const getAllMessages = async (flatId) => {
    const response = await axios.get(`/flats/${flatId}/messages`);
    return response.data;
};

export const getUserMessages = async (flatId, senderId) => {
    const response = await axios.get(`/flats/${flatId}/messages/${senderId}`);
    return response.data;
};

export const addMessage = async (flatId, messageData) => {
    const response = await axios.post(`/flats/${flatId}/messages`, messageData);
    return response.data;
};
