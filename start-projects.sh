#!/bin/bash
# start-projects.sh
#
# This script:
#   - Prompts for PostgreSQL credentials,
#   - Updates/creates the .env file in the accessibility-api directory,
#   - Installs dependencies non-interactively,
#   - Starts the backend (accessibility-api) using "npm run dev"
#     (which runs ensure-db, migrations, and then starts the server via ts-node-dev),
#   - Starts the frontend (accessibility-app) using "npm run dev" (for a Vite project),
#   - Redirects console output to log files (located in the "logs" folder),
#   - Tails the log files so you can see output,
#   - Waits for a key press to terminate both projects.
#
# Ensure this script has execute permissions:
#   chmod +x start-projects.sh

set -e
set -o pipefail
set -x  # Enable debugging output (optional; remove if not needed)

# Create a logs directory in the parent folder if it doesn't exist.
mkdir -p logs

# --- Step 1: Prompt for PostgreSQL Credentials ---
read -p "Enter your PostgreSQL username (default: postgres): " DB_USER
read -s -p "Enter your PostgreSQL password: " DB_PASS
echo ""
if [ -z "$DB_USER" ]; then
  DB_USER="postgres"
fi

# --- Step 2: Update or Create the .env file in accessibility-api ---
ENV_FILE="accessibility-api/.env"
echo "Updating PostgreSQL credentials in $ENV_FILE ..."
if [ ! -f "$ENV_FILE" ]; then
  echo ".env file not found in accessibility-api. Creating a new one..."
  cat > "$ENV_FILE" <<EOL
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=$DB_USER
DB_PASSWORD=$DB_PASS
DB_NAME=accessibilitydb
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
EOL
  echo ".env file created.please add your openai api key"
else
  # Update the DB_USERNAME and DB_PASSWORD lines in the existing file.
  sed -i.bak "s/^DB_USERNAME=.*/DB_USERNAME=$DB_USER/" "$ENV_FILE"
  sed -i.bak "s/^DB_PASSWORD=.*/DB_PASSWORD=$DB_PASS/" "$ENV_FILE"
  echo ".env file updated."
fi

# --- Step 3: Define a function to install dependencies non-interactively ---
install_dependencies() {
  if [ -f "package-lock.json" ]; then
    echo "Lockfile found in $(pwd). Running 'npm ci'..."
    npm ci --prefer-offline --loglevel=error
  else
    echo "No lockfile found in $(pwd). Running 'npm install'..."
    npm install --prefer-offline --no-audit --no-fund --loglevel=error
  fi
}

# --- Step 4: Define a function to start a project in the background ---
start_project() {
  local dir=$1
  local start_cmd=$2

  echo "Starting project in directory: $dir"
  if [ ! -d "$dir" ]; then
    echo "Directory $dir does not exist!"
    exit 1
  fi
  
  pushd "$dir" > /dev/null
  echo "Current directory: $(pwd)"

  install_dependencies
  
  echo "Running start command: '$start_cmd' in $(pwd)"
  # Use nohup to detach and redirect output to a log file in the parent logs folder.
  nohup $start_cmd > "../logs/${dir}.log" 2>&1 &
  local pid=$!
  echo "Started project in $dir with PID: $pid (log: ../logs/${dir}.log)"
  popd > /dev/null
  echo $pid
}

# --- Step 5: Start Backend and Frontend Projects ---
echo "Starting backend (accessibility-api)..."
BACKEND_PID=$(start_project "accessibility-api" "npm run dev")
echo "Backend PID: $BACKEND_PID"

echo "Starting frontend (accessibility-app)..."
FRONTEND_PID=$(start_project "accessibility-app" "npm run dev")
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "Both projects are running."
echo "  Backend (accessibility-api) PID: $BACKEND_PID (log: logs/accessibility-api.log)"
echo "  Frontend (accessibility-app) PID: $FRONTEND_PID (log: logs/accessibility-app.log)"
echo ""

# --- Step 6: Tail Logs in Background ---
# Tail both logs concurrently. The output will remain on screen.
tail -n 20 -f logs/accessibility-api.log logs/accessibility-app.log &
TAIL_PID=$!

echo "Press any key to stop the projects..."
read -n 1 -s -r -p "Press any key to stop the projects..."
echo ""

# --- Step 7: Cleanup ---
echo "Stopping projects..."
kill "$BACKEND_PID" "$FRONTEND_PID"
kill "$TAIL_PID"
echo "Projects stopped."
