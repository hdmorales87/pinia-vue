# API Configuration

This project uses [json-server](https://github.com/typicode/json-server) as a fake REST API for demonstration purposes. The API configuration is centralized and can be easily customized.

## Setup

### 1. Install Dependencies
The project already includes:
- `json-server`: Fake REST API
- `concurrently`: Run multiple npm scripts simultaneously

### 2. Start the API

**Option 1: Run API and Vite together (recommended)**
```bash
npm run dev:all
```

**Option 2: Run separately**
Terminal 1 - Start the API:
```bash
npm run dev:api
```

Terminal 2 - Start the Vue app:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Configuration Files

### 1. Environment Variables (.env)
Create a `.env` file in the root directory to customize the API URL:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 2. API Config (src/config/api.config.js)
The main configuration file for API endpoints:

```javascript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  endpoints: {
    movies: '/movies',
  }
}
```

### 3. Database (db.json)
The json-server database file is located at the root:
```json
{
  "movies": [
    {
      "id": 1,
      "title": "The Shawshank Redemption",
      "director": "Frank Darabont",
      "genre": "Drama",
      "year": 1994
    }
  ]
}
```

## How to Customize

### Change the API URL
1. Copy `.env.example` to `.env`
2. Modify `VITE_API_BASE_URL` to your desired API URL
3. Restart the development server for changes to take effect

### Add New Endpoints
1. Add the resource to `db.json`
2. Edit `src/config/api.config.js` and add the endpoint:

```javascript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  endpoints: {
    movies: '/movies',
    users: '/users',
    comments: '/comments'
  }
}
```

## Current Implementation

The store (`src/stores/movie2.js`) includes:
- `fetchMovies()`: Loads movies from the API on component mount
- `addMovie()`: Creates a new movie via POST request
- `updateMovie()`: Updates a movie via PATCH request
- `deleteMovie()`: Deletes a movie via DELETE request

All API calls include error handling with fallback to local state management if the API fails.

## NPM Scripts

- `npm run dev`: Start Vite development server only
- `npm run dev:api`: Start json-server only (port 3000)
- `npm run dev:all`: Start both Vite and json-server simultaneously
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## Notes

- json-server provides a full REST API with CRUD operations
- Changes to `db.json` are automatically reflected in the API
- The API supports standard HTTP methods: GET, POST, PUT, PATCH, DELETE
- Data persists in `db.json` file (changes are saved)
- The `.env` file is included in `.gitignore` for security
- For production, replace json-server with your actual backend API
