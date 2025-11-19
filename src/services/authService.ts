import api from './api';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types';

export const authService = {
  async register(credentials: RegisterCredentials): Promise<{ message: string }> {
    console.log('🔍 [register] Credentials:', { ...credentials, password: '***' });
    
    try {
      const response = await api.post('/auth/register', credentials);
      console.log('✅ [register] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [register] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('🔍 [login] Credentials:', { ...credentials, password: '***' });
    
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Guardar en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log('✅ [login] Login exitoso, usuario:', user.email);
      return response.data;
    } catch (error: any) {
      console.error('❌ [login] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async getProfile(): Promise<User> {
    console.log('🔍 [getProfile] Obteniendo perfil...');
    
    try {
      const response = await api.get('/auth/profile');
      console.log('✅ [getProfile] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [getProfile] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout(): void {
    console.log('🔍 [logout] Cerrando sesión...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('✅ [logout] Sesión cerrada');
  },

  getStoredToken(): string | null {
    return localStorage.getItem('token');
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};