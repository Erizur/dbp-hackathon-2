import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🌐 [API Request] ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: config.data,
      hasToken: !!token,
    });
    return config;
  },
  (error) => {
    console.error('❌ [API Request Error]', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación y logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Evitar bucles infinitos si la redirección falla
    if (!originalRequest) {
      return Promise.reject(error);
    }

    console.error(`❌ [API Error] ${originalRequest.method?.toUpperCase()} ${originalRequest.url}`, {
      status: error.response?.status,
      message: error.message,
    });

    // 1. Manejo de 401 (No autorizado) - Tu corrección anterior
    // Ignoramos si es la petición de login para no recargar la página
    const isLoginRequest = originalRequest.url?.includes('/auth/login');
    
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // 2. NUEVO: Manejo de 404 (No encontrado)
    // Si la API dice que el recurso no existe, vamos al Dashboard
    if (error.response?.status === 404) {
      // Opcional: Solo redirigir si es una petición GET (navegación)
      if (originalRequest.method === 'get') {
        console.warn('⚠️ [API] Recurso no encontrado (404), redirigiendo al dashboard...');
        window.location.href = '/dashboard';
        return Promise.resolve(); // Resolvemos para evitar errores en consola
      }
    }

    return Promise.reject(error);
  }
);

export default api;