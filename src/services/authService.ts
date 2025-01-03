import { LoginCredentials, User } from "../types/auth";

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

// Register Service
export async function registerUser(data: FormData): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    body: data, // No need to set headers; Fetch will handle it
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
}
export async function getUserDetails(userId: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
  
    return response.json();
  }
  
// Login Service
export async function loginUser(credentials: LoginCredentials): Promise<{ user: any; token: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Invalid credentials');
  }

  const data = await response.json();
  return data; // { user, token }
}

// Update User Service
export async function updateUser(
    userId: string,
    updatedData: { firstName?: string; lastName?: string; email?: string; password?: string }
  ): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update profile');
    }
  
    return response.json();
  }
  
