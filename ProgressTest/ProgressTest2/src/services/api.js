import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const getUsers = async () => {
    const res = await axios.get(`${BASE_URL}/users`);
    return res.data;
};

export const getExpensesByUser = async (userId) => {
    const res = await axios.get(`${BASE_URL}/expenses`);
    return res.data.filter(e => String(e.userId) === String(userId));
};

export const addExpenseAPI = async (expense) => {
    const res = await axios.post(`${BASE_URL}/expenses`, expense);
    return res.data;
};

export const updateExpenseAPI = async (id, expense) => {
    const res = await axios.put(`${BASE_URL}/expenses/${id}`, expense);
    return res.data;
};

export const deleteExpenseAPI = async (id) => {
    await axios.delete(`${BASE_URL}/expenses/${id}`);
};
