import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

const logStream = fs.createWriteStream(path.join(import.meta.dirname, '../access.log'), { flags: 'a' });

const loggingMiddleware = (toFile = false) => {
  if (toFile) {
    return morgan('combined', { stream: logStream });
  }
  return morgan('dev');
};

export default loggingMiddleware;
