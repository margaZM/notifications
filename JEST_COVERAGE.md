# Jest Coverage Guide

This project is configured with Jest coverage for unit testing across all backend microservices.

## Coverage Setup

Coverage is configured for the following backend applications:

- **auth**: Authentication service
- **contacts**: Contacts management service
- **notifications**: Notifications service
- **api-gateway**: API Gateway service

## Running Tests with Coverage

### Individual App Coverage

Run coverage for a specific application:

```bash
# Auth service
cd backend/apps/auth
pnpm test:cov

# Contacts service
cd backend/apps/contacts
pnpm test:cov

# Notifications service
cd backend/apps/notifications
pnpm test:cov

# API Gateway service
cd backend/apps/api-gateway
pnpm test:cov
```

### Watch Mode Coverage

Run coverage in watch mode for development:

```bash
# From the app directory
pnpm test:cov:watch
```

### All Tests (Without Coverage)

```bash
# From app directory
pnpm test           # Run tests once
pnpm test:watch     # Run tests in watch mode
pnpm test:e2e       # Run end-to-end tests
```

### Root-Level Coverage (All Apps)

If you have a monorepo root setup with the root `jest.config.ts`, you can run:

```bash
jest --coverage              # Coverage for all apps
jest --coverage --watch      # Watch mode coverage
jest --projects <pattern>    # Coverage for specific apps
```

## Coverage Configuration

### Per-App Configuration

Each app has a `jest.config.ts` file with the following settings:

- **Test Pattern**: `**/*.spec.ts`
- **Coverage Directory**: `./coverage` (relative to each app)
- **Coverage Reporters**:
  - `text`: Console output
  - `lcov`: For IDE integration
  - `html`: HTML report in `coverage/index.html`
  - `json-summary`: JSON summary for CI/CD

### Excluded from Coverage

- Test files (`**/*.spec.ts`)
- `node_modules/**`
- `dist/**`

## Coverage Thresholds

You can set coverage thresholds in `jest.config.ts` to enforce minimum coverage:

```typescript
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
}
```

## Viewing Coverage Reports

After running `pnpm test:cov`, open the HTML report:

```bash
# From the app directory
cd backend/apps/auth
open coverage/index.html  # macOS
start coverage/index.html # Windows
xdg-open coverage/index.html # Linux
```

## CI/CD Integration

For CI/CD pipelines, the JSON summary (`coverage/coverage-summary.json`) can be parsed for coverage metrics and passed to reporting tools.

## Generated Files

Coverage runs generate the following in each app's `coverage/` directory:

- `lcov.info` - LCOV format (for IDE integration)
- `coverage-summary.json` - JSON summary
- `index.html` - HTML report
- `*.html` - Per-file reports

## .gitignore

The `/coverage` directory is already configured in `.gitignore` to prevent coverage reports from being committed.

## Available Scripts

| Script           | Purpose                               |
| ---------------- | ------------------------------------- |
| `test`           | Run tests once                        |
| `test:watch`     | Run tests in watch mode               |
| `test:cov`       | Run tests with coverage               |
| `test:cov:watch` | Run tests with coverage in watch mode |
| `test:e2e`       | Run end-to-end tests                  |

## Example Workflow

```bash
# 1. Navigate to an app
cd backend/apps/auth

# 2. Run tests with coverage
pnpm test:cov

# 3. View the HTML report
start coverage/index.html

# 4. For development, use watch mode
pnpm test:cov:watch
```
