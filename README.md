# carlosfalcon.dev

Landing comercial de Carlos Falcón para desarrollo web, e-commerce, rediseño y automatización. HTML, CSS y JavaScript nativos, sin compilación ni dependencias de build.

## Contenido

- `index.html`: sitio completo (estructura, estilos y comportamiento).
- `carlos.jpg`: retrato suministrado por Carlos, con el logo del fondo eliminado.
- `trabajos/`: capturas de Richard Ferro y Bámbola.
- `tests/site.cjs`: pruebas estáticas y del formulario con entorno simulado.

## Diseño y movimiento

Lenguaje visual adaptado (no copiado) de referencias de agencia premium:

- Fondo casi negro `#0b0d0b`, acento menta `#52debb`, sección verde `#163227` y sección clara crema `#faf0e6`.
- Tipografía Poppins para títulos e Inter para texto.
- Animaciones: revelado por scroll (`IntersectionObserver`), titular palabra por palabra, marquee infinito, orbes de fondo en movimiento, botones y tarjetas con elevación al pasar el cursor.
- `prefers-reduced-motion` desactiva todas las animaciones.
- Mejora progresiva: el contenido se ve aunque JavaScript falle; las palabras se dividen solo si hay JS.

## Estructura de la página

Hero → capacidades → marquee → enfoque y proceso → sobre mí → proyectos → servicios → preguntas frecuentes → contacto → pie.

## Pruebas

```sh
node tests/site.cjs
```

Cubre: un solo `h1` y `main`, idioma y metadatos, existencia de todos los recursos locales, anclas internas con destino válido, JSON-LD parseable, ausencia de cifras y promesas no verificadas, soporte de movimiento reducido, atributos de accesibilidad y el envío del formulario a WhatsApp con codificación correcta y validación de nombre. No envía mensajes ni abre WhatsApp.

## Flujo comercial

El formulario no tiene backend ni almacena datos: compone un mensaje y lo abre en WhatsApp, donde el usuario confirma el envío. Cada servicio preselecciona la necesidad en el formulario.

No publicar precios, resultados comerciales, puntuaciones de rendimiento, testimonios ni condiciones de soporte sin validarlos con Carlos. Los ejemplos de clientes muestran proyectos realizados, sin atribuirles ventas o reseñas.

## Despliegue

- Repositorio: https://github.com/falconcarlosia-art/falcon-dev
- Dominio: https://carlosfalcon.dev
- El repositorio está conectado a Cloudflare (proyecto Worker `falcon-dev`); los cambios en `main` disparan el despliegue. Verificar el contenido público después de cada publicación y conservar la configuración existente.

## Verificación

Se probaron anchos de 320, 390, 768 y 1440 px sin desbordamiento horizontal, menú móvil con tecla Escape, anclas internas, carga de las tres imágenes y consola sin errores. Esto no sustituye una prueba en dispositivos físicos ni una auditoría Lighthouse.
