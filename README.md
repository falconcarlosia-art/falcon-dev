# carlosfalcon.dev

Landing comercial de Carlos Falcón para desarrollo web, e-commerce, rediseño y automatización. HTML, CSS y JavaScript nativos, sin compilación.

## Contenido
- `index.html`: sitio, metadatos, estilos y comportamiento.
- `carlos.jpg`: retrato suministrado por Carlos, con logo del fondo eliminado.
- `trabajos/`: capturas de Richard Ferro y Bámbola.
- `tests/site.cjs`: pruebas estáticas y del formulario con entorno simulado.

## Pruebas

```sh
node tests/site.cjs
git diff --check
```

Las pruebas del formulario verifican composición y codificación del mensaje sin enviar mensajes ni abrir WhatsApp.

## Flujo comercial

Portafolio al inicio, cuatro servicios diferenciados, enfoque de trabajo, proceso, preguntas frecuentes y formulario que prepara un mensaje de WhatsApp. No hay almacenamiento de leads ni backend. El usuario confirma el envío dentro de WhatsApp.

No publicar precios, resultados comerciales, puntuaciones de rendimiento, testimonios o condiciones de soporte sin validarlos con Carlos. Los ejemplos de clientes muestran proyectos realizados, no atribuyen sus ventas o reseñas al trabajo de desarrollo.

## Despliegue

Repositorio: https://github.com/falconcarlosia-art/falcon-dev
Dominio: https://carlosfalcon.dev

El sitio tiene una integración Git con Cloudflare; los cambios en main han activado el despliegue en el proyecto falcon-dev. Verificar el contenido público después de cada publicación. Conservar la configuración existente del Worker/activos estáticos; no sustituirla por un proyecto Pages nuevo.

## Verificación visual

Se comprobó la disposición en escritorio y una vista móvil de 390px. Se probaron anchos de iframe de 320, 390, 768 y 1440px sin desbordamiento horizontal; apertura del menú, Escape, selección del servicio y anclas internas. Esto no sustituye una prueba en dispositivos físicos ni una auditoría Lighthouse.
