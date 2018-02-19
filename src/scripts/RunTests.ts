import * as spawn from 'cross-spawn'; 
import * as path from 'path'; 
 
const pattern = process.argv[2] === 'e2e' 
  ? 'test/e2e/.+\\.spec\\.tsx?$' 
  : 'test/(?!e2e/)[^/]+/.+\\.spec\\.tsx?$'; 
 
const result = spawn.sync( 
  path.normalize('./node_modules/.bin/jest'), 
  [pattern, ...process.argv.slice(2)], 
  { stdio: 'inherit' } 
); 
 
process.exit(result.status);