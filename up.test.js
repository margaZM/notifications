const { execSync } = require('child_process');
const path = require('path');

execSync(
	'docker compose -f docker-compose.test.yml up --build --exit-code-from notifications-service',
	{
		cwd: path.join(__dirname, 'backend'),
		stdio: 'inherit',
	},
);
