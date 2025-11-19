import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Project, ProjectStatus } from '../types';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { Card } from '../components/common/Card';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 3; // Definimos el límite por página
  
  // Búsqueda y Filtros
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | ''>(''); // NUEVO: Filtro de estado
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      setShowCreateModal(true);
    }
  }, [searchParams]);

  // Recargar cuando cambien la página, la búsqueda o el filtro
  useEffect(() => {
    loadProjects();
  }, [currentPage, search, statusFilter]); // statusFilter añadido aquí

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const params: any = { 
        page: currentPage, 
        limit: ITEMS_PER_PAGE 
      };

      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter; // Aplicar filtro de estado

      const response = await projectService.getProjects(params.page, params.limit, params.search, params.status);
      
      setProjects(response.projects);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // NUEVO: Reiniciar a página 1 cuando se cambian filtros o búsqueda
  const handleFilterChange = (setter: any, value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) return;
    
    try {
      await projectService.deleteProject(id.toString());
      loadProjects();
    } catch (error) {
      alert('Error al eliminar proyecto');
    }
  };

  const statusColors: Record<ProjectStatus, string> = {
    ACTIVE: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-blue-100 text-blue-800',
    ON_HOLD: 'bg-yellow-100 text-yellow-800',
  };

  const statusLabels: Record<ProjectStatus, string> = {
    ACTIVE: 'Activo',
    COMPLETED: 'Completado',
    ON_HOLD: 'En Espera',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Proyectos</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          ➕ Nuevo Proyecto
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Filtros y Búsqueda</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Buscar proyectos por nombre o descripción..."
            value={search}
            onChange={(e) => handleFilterChange(setSearch, e.target.value)} // Usamos handleFilterChange
            className="flex-1"
          />
          <div>
            <label className="sr-only">Estado</label>
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)} // Usamos handleFilterChange
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos los Estados</option>
              <option value="ACTIVE">Activo</option>
              <option value="COMPLETED">Completado</option>
              <option value="ON_HOLD">En Espera</option>
            </select>
          </div>
          <Button variant="secondary" onClick={clearFilters}>Limpiar</Button>
        </div>
      </Card>
      
      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      ) : projects.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-600">No se encontraron proyectos con los filtros seleccionados.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="p-6 hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors[project.status]}`}>
                    {statusLabels[project.status]}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-3">{project.description}</p>
                
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    Ver Detalles
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditingProject(project)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(project.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4">
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Anterior
          </Button>
          <span className="text-gray-600 font-medium">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Siguiente →
          </Button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {(showCreateModal || editingProject) && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => {
            setShowCreateModal(false);
            setEditingProject(null);
          }}
          onSuccess={() => {
            loadProjects();
            setShowCreateModal(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
};

// Project Form Modal Component (Se mantiene igual)
const ProjectFormModal = ({
  project,
  onClose,
  onSuccess,
}: {
  project: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [status, setStatus] = useState<ProjectStatus>(project?.status || 'ACTIVE');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (project) {
        const updateData: any = {};
        if (name !== project.name) updateData.name = name;
        if (description !== project.description) updateData.description = description;
        if (status !== project.status) updateData.status = status;
        
        await projectService.updateProject(project.id.toString(), updateData);
      } else {
        await projectService.createProject({ 
          name, 
          description: description || null,
          status 
        });
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar proyecto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={project ? 'Editar Proyecto' : 'Crear Proyecto'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <Input
          label="Nombre del Proyecto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ACTIVE">Activo</option>
            <option value="COMPLETED">Completado</option>
            <option value="ON_HOLD">En Espera</option>
          </select>
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {project ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};