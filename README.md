# Vue 3 + Pinia + Bootstrap CRUD Application

Una aplicación CRUD completa para gestión de películas construida con Vue 3, Pinia, Bootstrap y json-server como API fake.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura](#arquitectura)
- [API Configuration](#api-configuration)
- [Componentes](#componentes)
- [Store (Pinia)](#store-pinia)
- [Desarrollo](#desarrollo)
- [Build y Producción](#build-y-producción)
- [Troubleshooting](#troubleshooting)

## ✨ Características

- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar) de películas
- 🎨 Interfaz moderna con Bootstrap 5
- 📦 Gestión de estado con Pinia (Composition API)
- 🔗 API REST fake con json-server
- ✅ Validación de formularios
- 🧩 Componentes modulares y reutilizables
- 🔄 Modo edición con carga de datos
- ⚡ Reactividad con Vue 3 Composition API
- 🎯 Configuración centralizada de API
- 📱 Diseño responsivo

## 🛠 Stack Tecnológico

### Frontend
- **Vue 3.5.42** - Framework JavaScript progresivo
- **Pinia 4.0.3** - Gestión de estado oficial de Vue
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **Vite 8.2.2** - Build tool y dev server

### Backend (Fake API)
- **json-server 1.0.0-beta.15** - API REST fake para desarrollo
- **concurrently 10.0.5** - Ejecución simultánea de scripts

### Herramientas de Desarrollo
- **Prettier 3.9.6** - Formateo de código
- **Vue DevTools 8.2.1** - Herramientas de debugging para Vue

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** - Versión ^22.18.0 o >=24.12.0
- **npm** - Viene incluido con Node.js

Verifica tu versión de Node.js:
```bash
node --version
```

## 🚀 Instalación

### 1. Clonar el repositorio (si aplica)
```bash
git clone <url-del-repositorio>
cd pinia-vue
```

### 2. Instalar dependencias
```bash
npm install
```

Esto instalará todas las dependencias necesarias del proyecto.

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
# En Windows (PowerShell)
echo VITE_API_BASE_URL=http://localhost:3000 > .env

# En Windows (Git Bash / CMD)
echo VITE_API_BASE_URL=http://localhost:3000 > .env

# En macOS/Linux
echo "VITE_API_BASE_URL=http://localhost:3000" > .env
```

O copia el archivo de ejemplo:
```bash
cp .env.example .env
```

### 4. Inicializar la base de datos de json-server

El archivo `db.json` ya incluye datos de ejemplo. Si necesitas reiniciarlo:

```json
{
  "movies": [
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "director": "Frank Darabont",
      "genre": "Drama",
      "year": 1994
    },
    {
      "id": 2,
      "title": "The Godfather",
      "director": "Francis Ford Coppola",
      "genre": "Drama",
      "year": 1972
    },
    {
      "id": 3,
      "title": "The Dark Knight",
      "director": "Christopher Nolan",
      "genre": "Action",
      "year": 2008
    },
    {
      "id": 4,
      "title": "Pulp Fiction",
      "director": "Quentin Tarantino",
      "genre": "Drama",
      "year": 1994
    },
    {
      "id": 5,
      "title": "The Matrix",
      "director": "The Wachowskis",
      "genre": "Action",
      "year": 1999
    }
  ]
}
```

## ⚙️ Configuración

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `VITE_API_BASE_URL` | URL base de la API | `http://localhost:3000` |

### Configuración de API

El archivo `src/config/api.config.js` centraliza la configuración de la API:

```javascript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  endpoints: {
    movies: '/movies',
  }
}
```

### Vite Config

El archivo `vite.config.js` incluye:
- Plugin de Vue
- Vue DevTools
- Alias `@` para el directorio `src`

## 🎮 Comandos Disponibles

### Desarrollo

```bash
# Iniciar solo Vite (servidor de desarrollo)
npm run dev

# Iniciar solo json-server (API fake)
npm run dev:api

# Iniciar ambos simultáneamente (recomendado)
npm run dev:all
```

**Nota:** Al usar `npm run dev:all`, se iniciarán:
- Vite en `http://localhost:5173` (o puerto disponible)
- json-server en `http://localhost:3000`

### Build

```bash
# Build para producción
npm run build

# Preview del build de producción
npm run preview
```

### Código

```bash
# Formatear código con Prettier
npm run format
```

## 📁 Estructura del Proyecto

```
pinia-vue/
├── .env                          # Variables de entorno (no versionado)
├── .env.example                  # Ejemplo de variables de entorno
├── .gitignore                    # Archivos ignorados por Git
├── API_CONFIG.md                 # Documentación de configuración de API
├── README.md                     # Este archivo
├── db.json                       # Base de datos de json-server
├── node_modules/                 # Dependencias (generado)
├── package.json                  # Configuración del proyecto y scripts
├── public/                       # Archivos estáticos
│   └── vite.svg
├── src/
│   ├── assets/                   # Assets estáticos
│   │   ├── base.css              # Estilos base
│   │   └── main.css              # Estilos principales
│   ├── components/               # Componentes Vue
│   │   ├── CrudComp.vue          # Componente principal (contenedor)
│   │   ├── MovieForm.vue         # Componente de formulario
│   │   └── MovieTable.vue        # Componente de tabla
│   ├── config/                   # Configuraciones
│   │   └── api.config.js         # Configuración de API
│   ├── stores/                   # Stores de Pinia
│   │   ├── movie1.js             # Store con Options API (opcional)
│   │   └── movie2.js             # Store con Composition API (activo)
│   ├── App.vue                   # Componente raíz
│   └── main.js                   # Punto de entrada
├── vite.config.js                # Configuración de Vite
└── index.html                    # HTML de entrada
```

## 🏗 Arquitectura

### Patrones de Diseño

1. **Separación de Responsabilidades**
   - **Contenedor (`CrudComp`)**: Gestiona estado y lógica de negocio
   - **Presentacional (`MovieForm`, `MovieTable`)**: Solo renderizan UI

2. **Gestión de Estado**
   - Pinia como store centralizado
   - Composition API para lógica reactiva
   - `storeToRefs` para mantener reactividad

3. **Comunicación entre Componentes**
   - Props向下传递 datos
   - Events向上传递 acciones

### Flujo de Datos

```
Usuario Interactúa
       ↓
Componente Presentacional (MovieForm/MovieTable)
       ↓
Emite Eventos
       ↓
Componente Contenedor (CrudComp)
       ↓
Valida y Procesa
       ↓
Pinia Store (movie2.js)
       ↓
API (json-server)
       ↓
Actualiza Estado
       ↓
Componentes Re-renderizan
```

## 🔌 API Configuration

### json-server

json-server proporciona una API REST completa basada en el archivo `db.json`.

#### Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/movies` | Obtener todas las películas |
| GET | `/movies/:id` | Obtener una película por ID |
| POST | `/movies` | Crear una nueva película |
| PUT | `/movies/:id` | Reemplazar una película |
| PATCH | `/movies/:id` | Actualizar parcialmente una película |
| DELETE | `/movies/:id` | Eliminar una película |

#### Ejemplos de Uso

```bash
# Obtener todas las películas
curl http://localhost:3000/movies

# Obtener una película
curl http://localhost:3000/movies/1

# Crear una película
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -d '{"title":"Inception","director":"Christopher Nolan","genre":"Action","year":2010}'

# Actualizar una película
curl -X PATCH http://localhost:3000/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"year":1995}'

# Eliminar una película
curl -X DELETE http://localhost:3000/movies/1
```

Para más detalles, consulta [API_CONFIG.md](./API_CONFIG.md).

## 🧩 Componentes

### CrudComp.vue (Contenedor)

**Responsabilidades:**
- Gestionar el estado del formulario
- Validar datos antes de enviar
- Coordinar acciones entre componentes
- Manejar estados de loading y error

**Estado:**
- `movieForm`: Datos del formulario
- `errors`: Mensajes de error de validación
- `isEditing`: Indica si está en modo edición
- `editingId`: ID de la película siendo editada

**Funciones:**
- `validateForm()`: Valida campos del formulario
- `addMovie()`: Crea una nueva película
- `updateMovie()`: Carga datos para edición
- `saveUpdate()`: Guarda cambios de edición
- `cancelEdit()`: Cancela modo edición
- `resetForm()`: Limpia el formulario
- `deleteMovie()`: Elimina una película

### MovieForm.vue (Presentacional)

**Props:**
- `form`: Objeto con datos del formulario
- `errors`: Objeto con mensajes de error
- `isEditing`: Booleano para modo edición

**Events:**
- `submit`: Emitido al enviar el formulario
- `cancel`: Emitido al cancelar edición

**Características:**
- Validación visual con Bootstrap
- Etiqueta dinámica del botón (Add/Update)
- Botón de cancelación en modo edición

### MovieTable.vue (Presentacional)

**Props:**
- `movies`: Array de películas a mostrar

**Events:**
- `edit`: Emitido al hacer click en Edit
- `delete`: Emitido al hacer click en Delete

**Características:**
- Tabla con estilo Bootstrap
- Acciones por fila
- Responsive con clases de Bootstrap

## 🗄 Store (Pinia)

### movie2.js (Composition API)

El store activo usa Composition API de Pinia.

#### Estado (State)
```javascript
const movies = ref([])           // Lista de películas
const loading = ref(false)       // Estado de carga
const error = ref(null)          // Mensaje de error
```

#### Getters
```javascript
const numberOfMovies = computed(() => movies.value.length)
```

#### Actions

**fetchMovies()**
- Carga películas desde la API
- Maneja errores de red
- Actualiza el estado de loading

**addMovie(movie)**
- Crea una nueva película vía POST
- Maneja errores con fallback local
- Actualiza el estado con la respuesta

**updateMovie(id, updatedData)**
- Actualiza una película vía PATCH
- Maneja errores con fallback local
- Actualiza el estado local

**deleteMovie(id)**
- Elimina una película vía DELETE
- Maneja errores con fallback local
- Actualiza el estado local

#### API Helper
```javascript
const apiCall = async (endpoint, options = {}) => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
  } catch (err) {
    error.value = err.message
    throw err
  } finally {
    loading.value = false
  }
}
```

### movie1.js (Options API)

Store alternativo usando Options API de Pinia (incluido como referencia).

## 💻 Desarrollo

### Flujo de Trabajo Típico

1. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev:all
   ```

2. **Abrir el navegador**
   - Vue app: `http://localhost:5173`
   - API: `http://localhost:3000/movies`

3. **Realizar cambios**
   - Editar componentes en `src/components/`
   - Editar store en `src/stores/`
   - Vite hace hot reload automático

4. **Formatear código**
   ```bash
   npm run format
   ```

### Vue DevTools

Instala la extensión [Vue DevTools](https://devtools.vuejs.org/) para tu navegador:
- Inspeccionar componentes
- Debuggear estado de Pinia
- Ver eventos y props
- Performance profiling

### Debugging

**Ver estado de Pinia:**
```javascript
// En cualquier componente
import { useMovieStore } from '@/stores/movie2'
const movieStore = useMovieStore()
console.log(movieStore.movies)
```

**Ver logs de API:**
Los errores de API se loguean en la consola con prefix `Failed to ...`

## 🏗 Build y Producción

### Build para Producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con:
- Assets optimizados
- CSS minificado
- JavaScript bundleado
- Hash de archivos para cache busting

### Preview del Build

```bash
npm run preview
```

Sirve el build de producción localmente para pruebas.

### Deployment

El proyecto está listo para deploy en cualquier hosting estático:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

**Nota:** Para producción, reemplaza json-server con tu API real configurando `VITE_API_BASE_URL`.

## 🔧 Troubleshooting

### Problemas Comunes

**1. json-server no inicia**
- Verifica que el puerto 3000 esté disponible
- Cambia el puerto en `package.json`: `--port 3001`

**2. Errores de CORS**
- json-server incluye CORS por defecto
- Si usas otra API, asegúrate de habilitar CORS

**3. Variables de entorno no se cargan**
- Asegúrate de reiniciar el servidor después de crear `.env`
- Las variables deben empezar con `VITE_` en Vite

**4. Hot reload no funciona**
- Reinicia el servidor de desarrollo
- Verifica que no haya errores de sintaxis

**5. Bootstrap no carga**
- Verifica que `bootstrap/dist/css/bootstrap.min.css` esté importado en `main.js`

### Logs y Debugging

**Habilitar logs detallados en Vite:**
```bash
npm run dev -- --debug
```

**Ver network requests:**
- Abre DevTools del navegador (F12)
- Ve a la pestaña Network
- Filtra por `fetch` o `XHR`

## 📚 Recursos Adicionales

- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Vite Documentation](https://vitejs.dev/)
- [json-server Documentation](https://github.com/typicode/json-server)
- [Vue DevTools](https://devtools.vuejs.org/)

## 📝 Licencia

Este proyecto es de uso educativo y de demostración.

## 👨‍💻 Autor

Desarrollado como ejemplo de Vue 3 + Pinia + CRUD application.

---

**Última actualización:** 2026-10-04
