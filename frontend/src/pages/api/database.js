const Database = require("pg").Pool;
import config from "../../../../backend/src/config/database.service";

const db = new Database(config);

export default async () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
