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

test('minimatch scan finds vulnerable nested and symlinked copies beside a patched top-level copy',()=>{
 const root=mkdtempSync(join(tmpdir(),'tb-security-minimatch-'));
 try {
  function pkg(path,name,version) {mkdirSync(path,{recursive:true});writeFileSync(join(path,'package.json'),JSON.stringify({name,version}));}
  pkg(join(root,'node_modules','minimatch'),'minimatch','11.0.1');
  pkg(join(root,'node_modules','parent'),'parent','1.0.0');
  pkg(join(root,'node_modules','parent','node_modules','minimatch'),'minimatch','10.2.6');
  pkg(join(root,'node_modules','legacy'),'legacy','1.0.0');
  pkg(join(root,'node_modules','legacy','node_modules','minimatch'),'minimatch','3.1.5');
  const minimatch=join(root,'node_modules','.pnpm','minimatch@7.0.0','node_modules','minimatch');
  pkg(minimatch,'minimatch','7.0.0');
  symlinkSync(minimatch,join(root,'node_modules','linked-minimatch'),'dir');
  pkg(join(root,'node_modules','.pnpm','minimatch@11.0.0','node_modules','minimatch'),'minimatch','11.0.0');
  const found=scanDependencies(root);
  assert.deepEqual(found.minimatch,['10.2.6','11.0.1','3.1.5','7.0.0']);
  const failures=securityFailures(found);
  assert.equal(failures.length,2);
  assert.ok(failures.some(f=>f.includes('minimatch@10.2.6')&&f.includes('CVE-2026-118764')));
  assert.ok(failures.some(f=>f.includes('minimatch@7.0.0')));
 } finally {rmSync(root,{recursive:true,force:true});}
});

test('minimatch CVE boundaries preserve unaffected legacy versions and require the patched release',()=>{
 assert.deepEqual(securityFailures({minimatch:['3.1.5','6.2.0','11.0.1','11.0.2','12.0.0']}),[]);
 for(const version of ['7.0.0','10.2.6','11.0.0']) {
  const failures=securityFailures({minimatch:[version]});
  assert.equal(failures.length,1);
  assert.match(failures[0],/CVE-2026-118764/);
 }
 assert.equal(securityFailures({minimatch:['11.0.1-beta.1']}).length,1,
  'an unverified prerelease must not silently pass the security guard');
});
