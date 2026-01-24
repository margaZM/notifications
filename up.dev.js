const { execSync } = require('child_process');
execSync('docker compose -f ./docker-compose.dev.yml up --build', { stdio: 'inherit' });
