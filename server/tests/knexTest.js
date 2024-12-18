import * as Path from 'node:path';
import * as URL from 'node:url';

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

console.log({ __filename, __dirname });
