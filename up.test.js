const { execSync, spawn } = require('child_process');
const path = require('path');

const backendPath = path.join(__dirname, 'backend');

try {
	execSync(
		'docker compose -f docker-compose.test.yml up --build --no-abort-on-container-exit --exit-code-from notifications-service',
		{
			cwd: backendPath,
			stdio: 'inherit',
		},
	);
} catch (error) {
	process.exit(1);
}
