const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');

// --- Estructura del documento ---
assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,'Debe existir un solo h1');
assert.equal((html.match(/<main[\s>]/g)||[]).length,1,'Debe existir un solo main');
assert.ok(/<html lang="es-PE">/.test(html),'Falta el idioma');
assert.ok(/name="description"/.test(html),'Falta meta description');
assert.ok(/rel="canonical"/.test(html),'Falta canonical');
assert.ok(/prefers-reduced-motion/.test(html),'Falta soporte para movimiento reducido');
assert.ok(/class="skip"/.test(html),'Falta enlace de salto al contenido');
assert.ok(/aria-expanded/.test(html),'Falta estado accesible del menú');

// --- Recursos locales ---
for(const m of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  const v=m[1];
  if(/^(https?:|#|data:|mailto:)/.test(v))continue;
  assert.ok(fs.existsSync(path.join(root,v)),'Recurso local inexistente: '+v);
}

// --- Anclas internas ---
for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(html.includes('id="'+m[1]+'"'),'Ancla sin destino: '+m[1]);

// --- Nada de cifras, precios ni promesas no verificadas ---
const prohibido=[/100\s*\/\s*100/,/S\/\s*\d/,/MÁS ELEGIDO/,/4\.3★/,/\d+\s*meses de soporte/,/\d+\s*horas/,/\+9\d\d/,/Fortune 500/,/testimonio/i];
for(const re of prohibido)assert.ok(!re.test(html),'Contenido no verificado presente: '+re);

// --- JSON-LD válido ---
const ld=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(ld,'Falta JSON-LD');
assert.equal(JSON.parse(ld[1])['@type'],'Person');

// --- Un solo script de comportamiento ---
const scripts=[...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map(x=>x[1]);
assert.equal(scripts.length,1,'Se esperaba un único script de comportamiento');

// --- Simulación del DOM ---
let payload={};
function el(){
  return {
    events:{}, value:'', dataset:{}, hidden:false, style:{},
    classList:{add(){},remove(){},toggle(){return true},contains(){return false}},
    setAttribute(){}, addEventListener(k,f){this.events[k]=f},
    querySelectorAll(){return []}, setCustomValidity(v){this.validity=v},
    reportValidity(){this.reported=true}, focus(){}
  };
}
const ids={};for(const id of ['nav','menuBtn','navLinks','leadForm','nombre','tipo'])ids[id]=el();
const docEl=el();
let destino=null;

const context={
  document:{getElementById:id=>ids[id],documentElement:docEl,querySelectorAll:()=>[],addEventListener(){}},
  window:{scrollY:0,matchMedia:()=>({matches:false}),addEventListener(){},location:{assign:u=>{destino=u}}},
  FormData:class{get(k){return payload[k]}},
  IntersectionObserver:undefined,
  encodeURIComponent,
  console
};
vm.runInNewContext(scripts[0],context);
assert.ok(true,'El script debe ejecutarse sin excepciones');

// --- Envío válido: debe navegar a WhatsApp con el mensaje codificado ---
payload={nombre:' María & José ',tipo:'Rediseño de mi web',web:'https://ejemplo.com/?a=1&b=2',detalle:'Catálogo + pagos / Perú'};
ids.leadForm.events.submit({preventDefault(){},currentTarget:{}});
assert.ok(destino,'El envío válido debe abrir WhatsApp');
const url=new URL(destino);
assert.equal(url.hostname,'wa.me','Debe abrir wa.me');
assert.equal(url.pathname,'/51926644490','Debe usar el número correcto');
const texto=url.searchParams.get('text');
for(const trozo of ['María & José','Rediseño de mi web','https://ejemplo.com/?a=1&b=2','Catálogo + pagos / Perú'])
  assert.ok(texto.includes(trozo),'Falta en el mensaje: '+trozo);
assert.ok(!destino.includes(' '),'La URL no debe contener espacios sin codificar');

// --- Nombre vacío: no debe navegar y debe reportar el error ---
destino=null;
payload={nombre:'   ',tipo:'Tienda online'};
ids.leadForm.events.submit({preventDefault(){},currentTarget:{}});
assert.equal(destino,null,'No debe navegar si el nombre está vacío');
assert.equal(ids.nombre.reported,true,'Debe reportar el campo obligatorio');

console.log('PASS · estructura, idioma, metadatos, recursos locales, anclas, JSON-LD, sin cifras no verificadas, movimiento reducido, accesibilidad básica, envío a WhatsApp con codificación correcta y validación de nombre. No se envió ningún mensaje.');
