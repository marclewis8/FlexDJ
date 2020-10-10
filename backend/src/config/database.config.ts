import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();
const baseDir = path.join(__dirname, "../");
const type: any = process.env.TYPEORM_CONNECTION;
console.log(baseDir + "/entity/*.ts");
export default {
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number.parseInt(process.env.TYPEORM_PORT, 10),
  logging: true,
  synchronize: false,
  type,
  entities: [baseDir + "/entity/*.ts"],
  migrations: [baseDir + "/migration/*.ts"],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === "true",
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
  },
  region: "",
  secretArn: "",
  resourceArn: "",
};
