import { useState, useEffect } from 'react';
import { teamService } from '../services/teamService';
import { TeamMember, Task } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [memberTasks, setMemberTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setIsLoading(true);
    try {
      const response = await teamService.getTeamMembers();
      setMembers(response.members);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMemberTasks = async (memberId: string) => {
    setIsLoadingTasks(true);
    try {
      const response = await teamService.getMemberTasks(memberId);
      setMemberTasks(response.tasks);
    } catch (error) {
      console.error('Error loading member tasks:', error);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member);
    loadMemberTasks(member.id.toString());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Equipo</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Members List */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Miembros del Equipo</h2>
          
          {members.length === 0 ? (
            <p className="text-gray-600">No hay miembros en el equipo.</p>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedMember?.id === member.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectMember(member)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Member Tasks */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedMember ? `Tareas de ${selectedMember.name}` : 'Selecciona un miembro'}
          </h2>

          {!selectedMember ? (
            <p className="text-gray-600">Selecciona un miembro del equipo para ver sus tareas.</p>
          ) : isLoadingTasks ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : memberTasks.length === 0 ? (
            <p className="text-gray-600">Este miembro no tiene tareas asignadas.</p>
          ) : (
            <div className="space-y-3">
              {memberTasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      task.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'URGENT' ? 'bg-red-100 text-red-800' :
                      task.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                      task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};