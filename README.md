# 日本語ノート
日本語勉強のための知識ベースみたいなオンラインノート

## Prerequisites

- **Node.js v24** or higher
- **MySQL** database server
- **npm** or **yarn** package manager

## Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Database Setup

1. Create a MySQL database named `nihongo-nouto` (or your preferred name)
2. Update the database credentials in the backend configuration file

### 3. Backend Configuration

1. Copy the sample environment file:
   ```bash
   cp server/env.js_sample server/env.js
   ```

2. Edit `server/env.js` and update the database credentials:
   ```javascript
   module.exports = {
     server: {
       port: 3000  // Backend server port
     },
     database: {
       username: 'root',        // Your MySQL username
       password: 'root',        // Your MySQL password
       host: 'localhost',
       port: 3306,
       name: 'nihongo-nouto'   // Your database name
     },
     environment: 'dev'
   }
   ```

### 4. Frontend Configuration

1. Create a `.env` file in the root directory:
   ```bash
   cp .env_example .env
   ```

2. Update `.env` with your backend API URL:
   ```env
   REACT_APP_API_HOST=http://localhost:3000
   ```

   **Note:** If your backend runs on a different port, update this accordingly. The default backend port is 3000.

## Running the Development Environment

### Option 1: Run Both Servers Separately (Recommended)

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
npm run serve:dev
# or
yarn serve:dev
```

The backend server will start on `http://localhost:3000` (or the port specified in `server/env.js`).

**Terminal 2 - Frontend Development Server:**
```bash
npm start
# or
yarn start
```

The frontend will start on `http://localhost:3001` (or the next available port if 3001 is taken). The React app will automatically open in your browser.

### Option 2: Using a Process Manager

You can use tools like `concurrently` or `npm-run-all` to run both servers with a single command. First install one of these:

```bash
npm install --save-dev concurrently
# or
npm install --save-dev npm-run-all
```

Then add a script to `package.json`:
```json
"dev": "concurrently \"npm run serve:dev\" \"npm start\""
```

## Available Scripts

- `npm start` - Start the React development server
- `npm run serve:dev` - Start the backend server with nodemon (auto-reload on changes)
- `npm run build` - Build the React app for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run prettier:fix` - Format code with Prettier
- `npm run check` - Run linting and formatting

## Project Structure

```
nihongo-nouto/
├── src/              # React frontend source code
├── server/           # Express backend server
│   └── app/         # Backend application code
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── utils/
├── public/          # Static assets
└── package.json
```

## Troubleshooting

### Backend won't start
- Check that MySQL is running
- Verify database credentials in `server/env.js`
- Ensure the database exists

### Frontend can't connect to backend
- Verify the backend is running on the port specified in `server/env.js`
- Check that `REACT_APP_API_HOST` in `.env` matches the backend URL
- Ensure CORS is enabled (it should be by default)

### Port conflicts
- If port 3000 is already in use, change the backend port in `server/env.js`
- Update `REACT_APP_API_HOST` in `.env` to match the new backend port
- The frontend will automatically use the next available port if the default is taken
