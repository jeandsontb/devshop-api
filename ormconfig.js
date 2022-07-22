/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  entities: ['./src/modules/**/entity/*.entity.ts'],
  migrations: ['./src/migration/**/*.ts'],
  cli: {
    entitiesDir: './src/**',
    migrationsDir: './src/migration',
  },
};
