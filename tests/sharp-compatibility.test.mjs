import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {realpathSync,readFileSync} from 'node:fs';
import test from 'node:test';

const require=createRequire(realpathSync(new URL('../node_modules/next/package.json',import.meta.url)));
const sharp=require('sharp');

test('patched image processor decodes and resizes the existing website social image',async()=>{
 const input=readFileSync(new URL('../public/og.png',import.meta.url));
 const output=await sharp(input).resize({width:320}).webp().toBuffer();
 const metadata=await sharp(output).metadata();
 assert.equal(metadata.width,320);
 assert.equal(metadata.format,'webp');
 assert.ok(metadata.height>0);
});
