# hack 2 - techflow

## 👥 INTEGRANTES

- Fabian Arana
- Angel Mattos

## INSTALACION

### Prerrequisitos
- Node.js 16+ instalado
- npm o yarn

### Pasos de Instalación

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── common/          
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Card.tsx
│   ├── Layout.tsx      
│   └── ProtectedRoute.tsx
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── Projects.tsx
│   ├── ProjectDetails.tsx
│   ├── Tasks.tsx
│   └── Team.tsx
├── services/
│   ├── api.ts           # Axios config
│   ├── authService.ts
│   ├── projectService.ts
│   ├── taskService.ts
│   └── teamService.ts
├── context/
│   └── AuthContext.tsx  # autenticacion
├── types/
│   └── index.ts         
├── App.tsx             
└── main.tsx            # Entry point
```

## 🌐 API

La aplicación consume la API de TechFlow:
- Todos los endpoints requieren autenticación JWT
- Los tokens se almacenan en localStorage

## 📱 Funcionalidades por Página

### Login / Registro
- Formularios con validación
- Manejo de errores
- Redirección automática al dashboard

### Dashboard
- 4 tarjetas de estadísticas
- Acciones rápidas para crear tareas y proyectos
- Feed de actividad

### Proyectos
- Grid responsive de tarjetas de proyectos
- Modal para crear/editar
- Paginación
- Búsqueda en tiempo real
- Estados visuales (Activo, Completado, En Espera)

### Detalles de Proyecto
- Información completa del proyecto
- Lista de tareas asociadas
- Navegación rápida a tareas

### Tareas
- Sistema de filtros completo
- Vista de lista con todas las tareas
- Acciones rápidas (Completar, Iniciar, Editar, Eliminar)
- Modal para crear/editar con todos los campos
- Indicadores visuales de estado y prioridad

### Equipo
- Lista de miembros del equipo
- Vista de tareas por miembro
- Interfaz interactiva

## 🎨 Características de UI/UX

- **Diseño Responsive**: Funciona en móviles, tablets y desktop
- **Loading States**: Spinners mientras cargan los datos
- **Estados Vacíos**: Mensajes informativos cuando no hay datos
- **Confirmaciones**: Modales de confirmación para acciones destructivas
- **Feedback Visual**: Colores diferenciados por estado y prioridad
- **Navegación Intuitiva**: Breadcrumbs y navegación clara

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📝 Notas Técnicas

### Autenticación
- Los tokens JWT se almacenan en localStorage
- Los interceptores de Axios añaden automáticamente el token a todas las peticiones
- Si el token expira (401), el usuario es redirigido al login

### Estado Global
- React Context para el estado de autenticación
- Estado local con useState para datos específicos de cada página
- No se usa Redux para mantener la simplicidad

### Tipos TypeScript
- Todos los tipos de la API están definidos en `src/types/index.ts`
- Los servicios están completamente tipados
- Los componentes usan interfaces propias

### Estilos
- Tailwind CSS con clases de utilidad
- Componentes reutilizables con props para variantes
- Sistema de colores consistente

---
