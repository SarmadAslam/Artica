// src/api/users.ts
import axios from 'axios';
import getBaseUrl from '@/lib/baseURL';

const API_URL = `${getBaseUrl()}/api/admin`;

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch single user
export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Create user ✅ NEW
export const createUser = async (userData: object) => {
  try {
    const response = await axios.post(`${API_URL}/user`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user
export const updateUser = async (id: string, userData: object) => {
  try {
    const response = await axios.put(`${API_URL}/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/user/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};