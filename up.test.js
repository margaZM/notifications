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
	const lastContainerId = execSync(
		'docker compose -f docker-compose.test.yml ps notifications-service -q',
		{
			cwd: backendPath,
			encoding: 'utf-8',
		},
	).trim();
	const exitCode = execSync(`docker wait ${lastContainerId}`, {
		encoding: 'utf-8',
	}).trim();

	logs.kill();
	if (exitCode !== '0') process.exit(1);
} catch (error) {
	console.error('Error:', error.message);
	process.exit(1);
}
