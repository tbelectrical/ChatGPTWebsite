import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { randomUUID } from "node:crypto";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import { createGoogleAdsTracker } from "../app/lib/google-ads.ts";

// Exercise the real submit handler without a browser, network or outgoing mail.
// Hook stubs capture state changes; the existing API suite covers validation/delivery.
const require = createRequire(import.meta.url);
const compiled = ts.transpileModule(readFileSync(new URL("../app/components/ContactForm.tsx", import.meta.url), "utf8"), {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function setup({ consent = false, result, status = 200, failure } = {}) {
  const states = [];
  const requests = [];
  let resets = 0;
  const fields = {name:"QA Test",phone:"07700900000",email:"qa@example.invalid",postcode:"SG5",service:"Inspection / EICR",propertyUse:"Landlord",message:"Two-bedroom rental. Report due next month.",website:""};
  const window = {location:{search:"",href:""},crypto:{randomUUID},dataLayer:[]};
  const ads = createGoogleAdsTracker(window, {createElement:()=>({remove(){}}),head:{appendChild:script=>script.onload()}});
  ads.setConsent(consent);
  const module = {exports:{}};
  runInNewContext(compiled, {
    module, exports:module.exports,
    require: name => name === "react" ? {useState: initial => [initial, next => states.push(next)]}
      : name === "../lib/google-ads" ? {getGoogleAdsTracker:()=>ads} : require(name),
    window, URLSearchParams, FormData:class {get(key){return fields[key] ?? null;}},
    fetch:async (url,init) => {
      requests.push({url,body:JSON.parse(init.body)});
      if (failure) throw new Error(failure);
      return new Response(JSON.stringify(result ?? {ok:true,reference:requests.at(-1).body.submissionId}),{status,headers:{"content-type":"application/json"}});
    },
  });
  const element = module.exports.ContactForm({source:"eicr-landing-page",eicrFocused:true});
  return {window,states,requests,ads,get conversions(){return window.dataLayer.map(args=>Array.from(args)).filter(args=>args[0]==="event"&&args[1]==="conversion");},get resets(){return resets;},submit:async()=>{await element.props.onSubmit({preventDefault(){},currentTarget:{reset(){resets++;}}});await Promise.resolve();}};
}

test("EICR form sends the service, customer category and source; denied consent emits no lead",async()=>{
  const qa=setup(); await qa.submit();
  assert.equal(qa.requests.length,1);
  const request=qa.requests[0];
  assert.equal(request.url,"/api/contact");
  assert.equal(request.body.service,"Inspection / EICR");
  assert.equal(request.body.source,"eicr-landing-page");
  assert.match(request.body.message,/Property enquiry: Landlord\n\nTwo-bedroom rental/);
  assert.ok(request.body.submissionId);
  assert.equal(qa.resets,1);
  assert.ok(qa.states.includes("success"));
  assert.equal(qa.conversions.length,0);
});

test("an acknowledged successful enquiry emits the Ads conversion only with advertising consent",async()=>{
  const qa=setup({consent:true}); await qa.submit();
  assert.equal(qa.conversions.length,1);
  assert.equal(qa.conversions[0][2].transaction_id,qa.requests[0].body.submissionId);
});

test("API validation failure and network failure preserve details without counting a lead",async()=>{
  for(const options of [{result:{ok:false,message:"Please check those details."},status:400},{failure:"Network unavailable"}]) {
    const qa=setup({consent:true,...options}); await qa.submit();
    assert.ok(qa.states.includes("error")); assert.equal(qa.resets,0);
    assert.equal(qa.conversions.length,0);
  }
});

test("unconfigured sending opens an email draft and never reports a sent enquiry",async()=>{
  const qa=setup({consent:true,result:{ok:false,code:"FORM_NOT_CONFIGURED"},status:503}); await qa.submit();
  assert.ok(qa.window.location.href.startsWith("mailto:tyler@tbelectrical.co.uk?"));
  assert.match(decodeURIComponent(qa.window.location.href),/Property enquiry: Landlord/);
  assert.ok(qa.states.includes("email"));
  assert.ok(!qa.states.includes("success"));
  assert.equal(qa.resets,0); assert.equal(qa.conversions.length,0);
});


test("honeypot acknowledgement without reference never counts as a conversion",async()=>{
  const qa=setup({consent:true,result:{ok:true}});await qa.submit();
  assert.ok(qa.states.includes("success"));assert.equal(qa.conversions.length,0);
});
