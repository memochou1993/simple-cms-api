import { cert, initializeApp } from 'firebase-admin/app';
import path from 'path';

const app = initializeApp({
  credential: cert(path.join(import.meta.dirname, '../serviceAccountKey.json')),
});

export default app;
