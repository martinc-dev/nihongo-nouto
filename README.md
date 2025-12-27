# 日本語ノート (Nihongo Nouto)
日本語勉強のための知識ベースみたいなオンラインノート

## Prerequisites

- **Node.js v24** or higher
- **npm** or **yarn** package manager
- **MariaDB** or **MySQL** (Local or via Docker)

## Development Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configuration

**Environment Variables:**
This project uses environment variables for configuration. You can set them in `server/env.ts` directly for dev (though creating a `.env` file or environment variables is preferred for production).

Example default configuration (`server/env.ts`):
```typescript
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  database: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'nihongo-nouto',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || 'nihongo-nouto',
  },
```

### 3. Running Development Server

To start both the backend and frontend servers concurrently with a single command:

```bash
npm run dev
# or
yarn dev
```

This will:
- Start the backend server on `http://localhost:3000`
- Start the frontend development server on `http://localhost:3001`
- Proxy API requests from frontend to backend automatically

### 4. Database (Local Dev)

Ensure you have a MariaDB/MySQL instance running locally matching the credentials in `server/env.ts`, or update the file to match your local setup.

## Deployment with Docker (Recommended)

The application is containerized using Docker, which is the easiest way to deploy to a server or NAS (like Synology, QNAP, or a Raspberry Pi).

### Docker Setup

The `docker-compose.yml` file sets up two services:
1.  **app**: The Node.js application (serving both frontend and backend).
2.  **db**: A MariaDB database instance.

### Deploying to a Local Server / NAS

1.  **Transfer Files**: Copy the project files to your server (e.g., via SSH, SCP, or Git). You primarily need:
    *   `Dockerfile`
    *   `docker-compose.yml`
    *   `package.json`
    *   `yarn.lock`
    *   `server/`
    *   `src/`
    *   `public/`
    *   `craco.config.js`
    *   `tsconfig.json`
    *   `devnotes/nihongo_nouto_backup/note/nihongo-nouto_2025-12-24.sql` (Initial DB Seed)

2.  **Configure Environment (Optional)**:
    You can customize the environment variables in `docker-compose.yml` if you want to change passwords or ports.
    
    ```yaml
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_USER=nn_user
      - MYSQL_PASSWORD=nn_password
      - MYSQL_DATABASE=nihongo-nouto
    ```

3.  **Build and Run**:
    Navigate to the directory containing `docker-compose.yml` on your server and run:

    ```bash
    docker-compose up -d --build
    ```

    *   `-d`: Detached mode (runs in background).
    *   `--build`: Forces a rebuild of the images.

4.  **Access the Application**:
    Open your browser and navigate to `http://<YOUR_SERVER_IP>:3000`.

### Database Persistence & Backups

*   **Persistence**: Database data is stored in a Docker volume named `db_data`. This ensures data persists even if you restart or remove containers.
*   **Initial Seed**: The `docker-compose.yml` is configured to automatically seed the database with `nihongo-nouto_2025-12-24.sql` on the **first run only** (when the volume is empty).

### Updating the Application

To update the application code on your server:

1.  Pull the latest changes (e.g., `git pull`).
2.  Rebuild the container:
    ```bash
    docker-compose up -d --build app
    ```
    This will rebuild the `app` service with new code and restart it with zero/minimal downtime (depending on configuration), while keeping the database running.

## Available Scripts

- `npm start` - Start the React development server
- `npm run serve:dev` - Start the backend server with nodemon
- `npm run dev` - Start both servers concurrently
- `npm run build` - Build both frontend and backend for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run check` - Run linting and formatting

## Project Structure

```
nihongo-nouto/
├── src/              # React frontend source code
├── server/           # Express backend server
│   └── app/          # Backend application code
├── public/           # Static assets
├── docker-compose.yml # Docker services configuration
└── Dockerfile        # Docker build instructions
```
