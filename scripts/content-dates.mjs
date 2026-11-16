import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const target = 'app/lib/generated/content-dates.json';
let previous = {};
try { previous = JSON.parse(readFileSync(target, 'utf8')); } catch {}
let files;
try {
  files = execFileSync('git', ['ls-files', 'app'], { encoding: 'utf8' }).trim().split('\n')
    .filter((file) => /\.(tsx?|json)$/.test(file) && !file.includes('/generated/'));
} catch {
  if (!Object.keys(previous).length) throw new Error('No hay historial Git ni fechas de contenido guardadas.');
  console.warn('Sin Git: se conservan las fechas verificadas del último build con historial.');
  process.exit(0);
}
const dates = {};
for (const file of files) {
  const history = execFileSync('git', ['log', '--follow', '--format=%cs', '--', file], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  if (history.length) dates[file] = { published: history.at(-1), modified: history[0] };
}
// Una clonación superficial no debe presentar la fecha del checkout como publicación.
const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim() === 'true';
if (shallow) {
  for (const [file, date] of Object.entries(dates)) {
    if (previous[file]) dates[file] = { published: previous[file].published, modified: [previous[file].modified, date.modified].sort().at(-1) };
    else throw new Error(`Historial incompleto para ${file}: generar fechas con un clon completo.`);
  }
}
writeFileSync(target, `${JSON.stringify(dates, null, 2)}\n`);
console.log(`Fechas Git verificadas para ${Object.keys(dates).length} archivos.`);
