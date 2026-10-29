import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,symlinkSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {scanDependencies,securityFailures} from '../scripts/check-security-versions.mjs';

// A secure top-level copy must not conceal a vulnerable nested dependency.
test('security scan catches npm nested versions and pnpm symlinked copies',()=>{
 const root=mkdtempSync(join(tmpdir(),'tb-security-'));
 try {
  function pkg(path,name,version) {mkdirSync(path,{recursive:true});writeFileSync(join(path,'package.json'),JSON.stringify({name,version}));}
  pkg(join(root,'node_modules','undici'),'undici','7.30.1');
  pkg(join(root,'node_modules','parent'),'parent','1.0.0');
  pkg(join(root,'node_modules','parent','node_modules','undici'),'undici','7.24.8');
  const satori=join(root,'node_modules','.pnpm','satori@0.16.0','node_modules','satori');
  pkg(satori,'satori','0.16.0');
  symlinkSync(satori,join(root,'node_modules','parent','node_modules','satori'),'dir');
  pkg(join(root,'node_modules','.pnpm','ws@8.18.0','node_modules','ws'),'ws','8.18.0');
  const found=scanDependencies(root);
  assert.deepEqual(found.ws,[], 'unreachable virtual-store cache is not an installed dependency');
  assert.deepEqual(found.undici,['7.24.8','7.30.1']);
  assert.deepEqual(found.satori,['0.16.0']);
  const failures=securityFailures(found);
  assert.equal(failures.length,2);
  assert.ok(failures.some(f=>f.includes('undici@7.24.8')));
  assert.ok(failures.some(f=>f.includes('satori@0.16.0')));
 } finally {rmSync(root,{recursive:true,force:true});}
});
