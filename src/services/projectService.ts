import api from './api';
import type { Project, ProjectsResponse, CreateProjectDto, UpdateProjectDto } from '../types';

export const projectService = {
  async getProjects(page = 1, limit = 10, search = ''): Promise<ProjectsResponse> {
    const response = await api.get('/projects', {
      params: { page, limit, search },
    });
    return response.data;
  },

  async getProjectById(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  async createProject(data: CreateProjectDto): Promise<Project> {
    const response = await api.post('/projects', data);
    return response.data;
  },

  async updateProject(id: string, data: UpdateProjectDto): Promise<Project> {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  async deleteProject(id: string): Promise<{ message: string }> {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};