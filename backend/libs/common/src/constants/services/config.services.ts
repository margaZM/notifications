export const SERVICES_CONFIG = {
  GATEWAY: {
    PORT: 3000,
  },
  AUTH: {
    HOST: process.env.AUTH_HOST || "127.0.0.1",
    PORT: 3001,
  },
  CONTACTS: {
    HOST: process.env.CONTACTS_HOST || "127.0.0.1",
    PORT: 3002,
  },
  NOTIFICATIONS: {
    HOST: process.env.NOTIFICATIONS_HOST || "127.0.0.1",
    PORT: 3003,
  },
};
