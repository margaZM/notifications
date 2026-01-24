const { execSync } = require('child_process');
execSync(
	'docker compose -f docker-compose.test.yml up --build --abort-on-container-exit',
	{
		cwd: path.join(__dirname, 'backend'),
		stdio: 'inherit',
	},
);
