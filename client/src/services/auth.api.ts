const API_BASE_URL = 'http://localhost:3000';

export interface User {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
  };
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

// Token management utilities
export const getToken = () => localStorage.getItem('auth_token');
export const setToken = (token: string) => localStorage.setItem('auth_token', token);
export const removeToken = () => localStorage.removeItem('auth_token');

// Base API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ 
      message: 'An error occurred' 
    }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth API functions
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  // Store token after successful login
  setToken(response.access_token);
  return response;
};

export const register = async (name: string, email: string, password: string): Promise<LoginResponse> => {
  const response = await apiRequest<LoginResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  
  // Store token after successful registration
  setToken(response.access_token);
  return response;
};

export const verifyToken = async (): Promise<User | null> => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const response = await apiRequest<{ valid: boolean; user: User }>('/auth/verify', {
      method: 'POST',
    });
    
    if (!response.valid) {
      removeToken();
      return null;
    }
    
    return response.user;
  } catch (error) {
    removeToken();
    return null;
  }
};

export const logout = () => {
  removeToken();
  // Optionally make API call to invalidate token on server
  // await apiRequest('/auth/logout', { method: 'POST' });
};