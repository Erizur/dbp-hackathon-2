import api from './api';
import { Project, ProjectsResponse, CreateProjectDto, UpdateProjectDto } from '../types';

export const projectService = {
  async getProjects(page = 1, limit = 10, search = ''): Promise<ProjectsResponse> {
    console.log('🔍 [getProjects] Params:', { page, limit, search });
    
    try {
      const response = await api.get('/projects', {
        params: { page, limit, search },
      });
      console.log('✅ [getProjects] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [getProjects] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async getProjectById(id: string): Promise<Project> {
    console.log('🔍 [getProjectById] ID:', id);
    
    try {
      const response = await api.get(`/projects/${id}`);
      console.log('✅ [getProjectById] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [getProjectById] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async createProject(data: CreateProjectDto): Promise<Project> {
    console.log('🔍 [createProject] Data:', data);
    
    try {
      const response = await api.post('/projects', data);
      console.log('✅ [createProject] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [createProject] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async updateProject(id: string, data: UpdateProjectDto): Promise<Project> {
    console.log('🔍 [updateProject] ID:', id, 'Data:', data);
    
    try {
      const response = await api.put(`/projects/${id}`, data);
      console.log('✅ [updateProject] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [updateProject] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async deleteProject(id: string): Promise<{ message: string }> {
    console.log('🔍 [deleteProject] ID:', id);
    
    try {
      const response = await api.delete(`/projects/${id}`);
      console.log('✅ [deleteProject] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [deleteProject] Error:', error.response?.data || error.message);
      throw error;
    }
  },
};