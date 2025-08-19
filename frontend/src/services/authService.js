import api from './api';

const register = async (userData) => {
  try {
    const response = await api.post('/users/', userData);
    if (response.data) {
      // After registration, log in the user
      const loginResponse = await login(userData.username, userData.password);
      return loginResponse;
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const login = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await api.post('/users/token', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      
      // Get user info
      const userResponse = await api.get('/users/me');
      const user = userResponse.data;
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token: response.data.access_token };
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;