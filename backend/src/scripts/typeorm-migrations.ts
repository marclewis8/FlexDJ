import databaseService from '../config/database.service';
import fs = require('fs');
fs.writeFileSync('ormconfig.json', JSON.stringify(databaseService, null, 2));
