import { createApp } from './app.js'
import { config } from './config.js';
import { initDb } from './db/init.js';

const app = createApp();

async function start() {
  await initDb();
  app.listen(config.port, () => {
    console.log(`Backend listening on port ${config.port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});
