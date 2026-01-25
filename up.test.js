const { execSync, spawn } = require('child_process');
const path = require('path');

const backendPath = path.join(__dirname, 'backend');

try {
	execSync('docker compose -f docker-compose.test.yml up --build -d', {
		cwd: backendPath,
		stdio: 'inherit',
	});
	const logs = spawn(
		'docker',
		['compose', '-f', 'docker-compose.test.yml', 'logs', '-f'],
		{
			cwd: backendPath,
			stdio: 'inherit',
		},
	);
	execSync(
		'docker compose -f docker-compose.test.yml up --exit-code-from notifications-service',
		{
			cwd: backendPath,
			stdio: 'inherit',
		},
	);
	logs.kill();
} catch (error) {
	process.exit(1);
}
// NOTA: NO agregues el cleanup aquí (el "down -v"),
// deja que CircleCI lo haga después de subir a Coveralls.
