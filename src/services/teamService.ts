import api from './api';
import { TeamMember, Task } from '../types';

export const teamService = {
  async getTeamMembers(): Promise<{ members: TeamMember[] }> {
    console.log('🔍 [getTeamMembers] Obteniendo miembros del equipo...');
    
    try {
      const response = await api.get('/team/members');
      console.log('✅ [getTeamMembers] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [getTeamMembers] Error:', error.response?.data || error.message);
      throw error;
    }
  },

  async getMemberTasks(memberId: string): Promise<{ tasks: Task[] }> {
    console.log('🔍 [getMemberTasks] Member ID:', memberId);
    
    try {
      const response = await api.get(`/team/members/${memberId}/tasks`);
      console.log('✅ [getMemberTasks] Response exitoso:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ [getMemberTasks] Error:', error.response?.data || error.message);
      throw error;
    }
  },
};