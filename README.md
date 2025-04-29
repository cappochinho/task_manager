Here's an updated `README.md` with PostgreSQL setup instructions:

```markdown
# Task Manager Application

A full-stack task management system with a .NET Web API backend, PostgreSQL database, and React frontend.

## Prerequisites

### Backend
- .NET SDK (version 6.0 or later)
- Entity Framework Core tools
- PostgreSQL (version 12 or later)

### Frontend
- Node.js (version 16 or later)
- npm (version 8 or later)

## Setup and Installation

### PostgreSQL Database Setup
1. Install PostgreSQL:
   - **Windows**: Download from [PostgreSQL official site](https://www.postgresql.org/download/windows/)
   - **Mac**: `brew install postgresql`
   - **Linux**: `sudo apt-get install postgresql postgresql-contrib`

2. Start PostgreSQL service:
   ```bash
   sudo service postgresql start  # Linux/Mac
   # or use pgAdmin on Windows
   ```

3. Create database and user:
   ```bash
   sudo -u postgres psql
   CREATE DATABASE taskmanager;
   CREATE USER taskadmin WITH PASSWORD 'yourpassword';
   GRANT ALL PRIVILEGES ON DATABASE taskmanager TO taskadmin;
   \q
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd TaskManagementSystem
   ```

2. Update connection string in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Database=taskmanager;Username=taskadmin;Password=yourpassword"
   }
   ```

3. Apply database migrations:
   ```bash
   dotnet ef database update
   ```

4. Run the backend:
   ```bash
   dotnet run
   ```
   The API will start on `https://localhost:5154/api`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd TaskManagerFrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Usage
- Access the frontend in your browser at `http://localhost:5173`
- The frontend will automatically connect to the backend API
- The backend will use the PostgreSQL database you configured

## Troubleshooting
- If you get connection errors, verify PostgreSQL is running:
  ```bash
  sudo service postgresql status
  ```
- Ensure your connection string matches your PostgreSQL credentials
- Check firewall settings if connecting remotely
```

This version:
1. Adds comprehensive PostgreSQL setup instructions
2. Includes database creation and user configuration
3. Shows how to update the connection string
4. Adds troubleshooting tips
5. Maintains clear section separation
6. Provides platform-specific instructions where needed