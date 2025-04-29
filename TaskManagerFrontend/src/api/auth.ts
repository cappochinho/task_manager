import api from './axios';

interface LoginPayload {
  username: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post(`/Auth/login?username=${payload.username}&password=${payload.password}`);
  return response.data;
};

export const register = async (payload: LoginPayload) => {
  const response = await api.post(`/Auth/register?username=${payload.username}&password=${payload.password}`);
  return response.data;
};
