import axios from "axios";

export const GetAPI = async (endpoint: string) => {
  const res = await axios.get(`http://localhost:8000${endpoint}`);
  return res.data;
};

interface data {
  name: string;
  desc: string;
  price: number;
  stock: number;
}

export const AddAPI = async (endpoint: string, data: data) => {
  const res = await axios.post(`http://localhost:8000${endpoint}`, data);
  return res.data;
};

export const GetByIdAPI = async (endpoint: string) => {
  const res = await axios.get(`http://localhost:8000${endpoint}`);
  return res.data;
};

export const UpdateAPI = async (endpoint: string, data: data) => {
  const res = await axios.put(`http://localhost:8000${endpoint}`, data);
  return res.data;
};

export const DeleteAPI = async (endpoint: string) => {
  try {
    const res = await axios.delete(`http://localhost:8000${endpoint}`);
    return res.data;
  } catch (error) {
    console.error("error", error);
  }
};
