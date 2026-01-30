# Notification Manager

A microservices-based application designed to manage and send notifications for authenticated users.

### Badges

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/EtZ5C4veuuhdPKvTD8Skwr/Gc4Ys21jG496ij23we4VEj/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/EtZ5C4veuuhdPKvTD8Skwr/Gc4Ys21jG496ij23we4VEj/tree/main)
[![Coverage Status](https://coveralls.io/repos/github/margaZM/notifications/badge.svg?branch=circleci-project-setup)](https://coveralls.io/github/margaZM/notifications?branch=circleci-project-setup)
[![Demo Video](https://img.shields.io/badge/Demo-Video-red?style=for-the-badge&logo=google-drive&logoColor=white)](https://drive.google.com/file/d/1xadqJSk4TvPsuzPUNP2x0kxDZA2ocigm/view?usp=sharing)

### Features

#### Authentication

- User Registration: Secure register for new users.

- User Login: Identity verification and session management.

#### Contact list

- Lifecycle: Full CRUD operations (Create, Read, Delete) for contacts for stores essential delivery fields: phoneNumber, email, and deviceToken.

#### Notifications management

- Lifecycle: Full CRUD operations (Create, Update, Read, Delete) for notifications.
- Multi-channel: Designed to handle different notification channels based on contact data.

#### Shared Libraries

Centralized Database & Schemas(@margazm/database): Centralizes the Prisma schema and database client. Ensures that any changes to the data model are instantly replicated across all microservices.

Common Utilities(@margazm/common): The configuration core of the ecosystem. It centralizes constants, port configurations for the API Gateway, service names, and common types, avoiding code duplication (DRY) and connection errors due to inconsistencies.

## Pre-Requisites

- Docker & Docker Compose: Configured to run without sudo permissions.
- Node.js: Version 20.x or higher.
- Ensure the following ports are free: 3000, 3001, 3002, 3003, 4000, and 5432.

## How to run the APP

To start the entire ecosystem (Frontend, Gateway, and Microservices), run:

```
node ./up.dev.js
```

The application will be available at:

Frontend: http://localhost:4000

API Gateway (Swagger docs): http://localhost:3000/docs

## How to run the tests

To execute the E2E test suite across all microservices:

```
node ./up.test.js
```

## Techs

- NestJS 11 (Node 20.19.6)
- PostgreSQL with Prisma ORM
- Next.js 15+
- Docker & Docker Compose

## Decisions made

- Clean Architecture: Implemented to decouple business logic from external frameworks, ensuring long-term maintainability.
- Microservices: Adopted to allow independent scaling and deployment of Auth, Contacts, and Notification logic.
- Prisma: Selected for its type-safety, excellent integration with NestJS, and widespread industry adoption.
- Docker: To make portable
- Jest/Testing/E2E: Focused on End-to-End testing with Jest to validate complete business flows.
- Next: Framework most used for frontend aplications.

## Areas to improve

- Implementation of Unit and Integration tests using React Testing Library/Cypress.
- Complete the UI for creating/editing contacts (currently available via API) and logout users.
- Configure automated pipelines for cloud deployment.

## Env vars should be defined

To find an example of the values you can use .env.example
