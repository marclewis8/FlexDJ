import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();
const baseDir = path.join(__dirname, '../');
const type: any = process.env.TYPEORM_CONNECTION;

export default {
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number.parseInt(process.env.TYPEORM_PORT, 10),
  logging: true,
  synchronize: false,
  type,
  entities: [baseDir + process.env.TYPEORM_ENTITIES],
  migrations: [baseDir + process.env.TYPEORM_MIGRATIONS],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  cli: {
    migrationsDir: baseDir + process.env.TYPEORM_MIGRATIONS_DIR,
    entitiesDir: baseDir + process.env.TYPEORM_ENTITIES_DIR,
  },
};
