const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const scripts=[...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
assert.equal(scripts.length,1);
assert.equal((html.match(/<h1>/g)||[]).length,1);
for(const m of html.matchAll(/(?:src)="([^"]+)"/g)){if(!m[1].startsWith('http'))assert.ok(fs.existsSync(path.join(__dirname,'..',m[1])),'Missing '+m[1]);}
for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(html.includes('id="'+m[1]+'"'),'Missing anchor '+m[1]);
assert.ok(!/100\s*\/\s*100|S\/\s*(890|1,690|2,900)|MÁS ELEGIDO|4\.3★|3 meses de soporte/.test(html));
JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
function element(){return {events:{},value:'',style:{},classList:{add(){},remove(){},toggle(){return true},contains(){return false}},setAttribute(){},addEventListener(k,f){this.events[k]=f},querySelectorAll(){return []},setCustomValidity(v){this.validity=v},reportValidity(){this.reported=true},focus(){}};}
const elements={};for(const id of ['menuBtn','navLinks','leadForm','nombre','tipo'])elements[id]=element();
const floating=element();let destination;
const context={document:{getElementById:id=>elements[id],documentElement:element(),querySelector:s=>floating,querySelectorAll:()=>[],addEventListener(){}},window:{location:{assign:url=>destination=url}},FormData:class{constructor(data){this.data=data}get(k){return this.data[k]}},encodeURIComponent};
vm.runInNewContext(scripts[0],context);
const data={nombre:' María & José ',tipo:'Rediseño de mi web',web:'https://ejemplo.com/?a=1&b=2',detalle:'Catálogo + pagos / Perú'};
elements.leadForm.events.submit({preventDefault(){},currentTarget:data});
const url=new URL(destination);assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/51926644490');
const message=url.searchParams.get('text');assert.ok(message.includes('María & José'));assert.ok(message.includes(data.web));assert.ok(message.includes(data.detalle));
destination=null;elements.leadForm.events.submit({preventDefault(){},currentTarget:{nombre:'   '}});assert.equal(destination,null);assert.equal(elements.nombre.reported,true);
console.log('PASS: script syntax, schema JSON, local images, anchor targets, single H1, unsupported claims removed, WhatsApp message encoding, blank-name validation. No message was sent.');
