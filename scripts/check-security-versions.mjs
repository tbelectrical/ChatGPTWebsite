import {existsSync,readFileSync,readdirSync,realpathSync} from 'node:fs';
import {join,resolve,dirname,sep} from 'node:path';
import {pathToFileURL} from 'node:url';

// Minimum releases addressing the Hostinger findings supplied on 29 Oct 2026.
export const minimumVersions = {
  undici:'7.30.1', ws:'8.21.0', sharp:'0.35.5', esbuild:'0.28.2',
  'image-size':'2.0.3', satori:'0.33.5', '@vercel/og':'1.0.3', fflate:'0.8.3',
};

export function scanDependencies(root) {
  const installed = new Map(Object.keys(minimumVersions).map(name=>[name,new Set()]));
  const visited = new Set();
  const visitedModules = new Set();
  function packageDirectory(directory) {
    let real;
    try { real=realpathSync(directory); } catch { return; }
    if(visited.has(real)) return;
    visited.add(real);
    const manifest=join(real,'package.json');
    let pkg;
    if(existsSync(manifest)) {
      pkg=JSON.parse(readFileSync(manifest,'utf8'));
      installed.get(pkg.name)?.add(pkg.version);
    }
    modules(join(real,'node_modules'));
    // pnpm places reachable dependencies beside the package's real directory.
    // Follow these links, never stale, unreachable entries in the virtual store.
    if(pkg && real.includes(`${sep}.pnpm${sep}`)) {
      modules(pkg.name.startsWith('@') ? dirname(dirname(real)) : dirname(real));
    }
  }
  function modules(directory) {
    if(!existsSync(directory)) return;
    const real=realpathSync(directory);
    if(visitedModules.has(real)) return;
    visitedModules.add(real);
    for(const entry of readdirSync(directory,{withFileTypes:true})) {
      const child=join(directory,entry.name);
      if(entry.name==='.pnpm') continue;
      if(entry.name.startsWith('@')) {
        for(const scoped of readdirSync(child)) packageDirectory(join(child,scoped));
      } else if(!entry.name.startsWith('.')) packageDirectory(child);
    }
  }
  if(!existsSync(join(root,'node_modules'))) throw new Error('Install dependencies before running the security version check.');
  modules(join(root,'node_modules'));
  return Object.fromEntries([...installed].map(([name,versions])=>[name,[...versions].sort()]));
}

export function securityFailures(installed) {
  const failures=[];
  for(const [name,versions] of Object.entries(installed)) for(const version of versions) {
    const match=/^(\d+)\.(\d+)\.(\d+)$/.exec(version);
    const minimum=minimumVersions[name]?.split('.').map(Number);
    if(!minimum) continue;
    const actual=match?.slice(1).map(Number);
    let comparison=0;
    if(actual) for(let i=0;i<3;i++) { if(actual[i]!==minimum[i]) {comparison=actual[i]-minimum[i];break;} }
    if(!actual||comparison<0) failures.push(`${name}@${version} is below the required ${minimumVersions[name]}`);
  }
  return failures;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href) {
  const installed=scanDependencies(process.cwd());
  const failures=securityFailures(installed);
  for(const [name,versions] of Object.entries(installed)) console.log(`${name}: ${versions.join(', ')||'not installed'}`);
  if(failures.length) {console.error(failures.join('\n'));process.exitCode=1;}
  else console.log('Security version check passed for all reachable copies of the flagged packages and rendering dependencies.');
}
