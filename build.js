import { build } from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import fs from "fs";
import path from "path";

function renameCssToScss(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameCssToScss(fullPath);
    } else if (path.extname(file) === ".css") {
      const newPath = path.join(dir, file.replace(".css", ".scss"));
      fs.renameSync(fullPath, newPath);
      console.log(`Renamed: ${fullPath} -> ${newPath}`);
    }
  }
}

build({
  entryPoints: [
    'src/**/*.ts',
    'src/**/*.tsx',
    'src/**/*.scss',
    'types/**/*.ts',
    '!**/*.test.ts',
    '!**/*.spec.ts'
  ],
  outdir: 'lib',
  bundle: false,
  platform: 'node',
  format: 'esm',
  target: 'es2017',
  sourcemap: false,
  jsx: 'transform',
  tsconfig: 'tsconfig.json',
  logLevel: 'info',
  plugins: [sassPlugin()]

})
  .then(() => {
    console.log('Build completed successfully');
    renameCssToScss(`./lib`);
})
.catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});