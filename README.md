# carlosfalcon.dev — One-pager personal

Sitio de una sola página para la línea de **desarrollo web para PyMEs**.
Stack: **HTML + CSS plano** (sin frameworks). Un solo archivo: `index.html`.

---

## 1. Estado del sitio

**Implementado:** hero con foto + chips flotantes, barra de capacidades, servicios,
proceso, portafolio (Richard Ferro + Bámbola) y contacto. Diseño premium con
gradientes, glass y animaciones de scroll.

**Pendientes (opcionales):**

| # | Qué | Dónde |
|---|---|---|
| 1 | **Correo** — crear buzón `carlos@carlosfalcon.dev` en Zoho | Zoho + DNS |
| 2 | **RUC / razón social** (da formalidad) | `footer` en `index.html` |
| 3 | **`www.carlosfalcon.dev`** — Add Domain + redirect | Cloudflare |

Confirma que el **WhatsApp** (`51926644490`) sea el número correcto para esta línea.

---

## 2. Publicar en Cloudflare Pages

### Opción A — Direct Upload (la más rápida, sin git)

```bash
cd ~/carlosfalcon-dev
npx wrangler pages deploy . --project-name=carlosfalcon-dev
```

La primera vez te pedirá iniciar sesión en Cloudflare (abre el navegador).
Al terminar te da una URL `*.pages.dev`. Luego conectas el dominio propio.

### Opción B — Conectar un repositorio Git

1. Sube esta carpeta a un repo de GitHub.
2. Cloudflare → **Workers & Pages** → **Create** → **Pages** → *Connect to Git*.
3. Selecciona el repo.
4. **Build command:** (déjalo vacío) — **Build output directory:** `/`
5. Deploy.

---

## 3. Conectar el dominio `carlosfalcon.dev`

1. Cloudflare → **Workers & Pages** → tu proyecto → **Custom domains**.
2. **Set up a custom domain** → escribe `carlosfalcon.dev` → Add.
3. Como el dominio ya está en tu cuenta, Cloudflare crea los registros DNS solo.
4. Repite con `www.carlosfalcon.dev` si lo quieres.
5. SSL es automático.

---

## 4. Correo (opcional)

Si quieres `carlos@carlosfalcon.dev`:

1. Zoho Mail → añade el dominio (misma cuenta que falcem/falcons) → crea el buzón.
2. Copia los **MX** que te da Zoho a Cloudflare → DNS.
3. Añade **SPF**, **DKIM** y **DMARC** (crítico si luego harás envíos).

---

## 5. Prueba local

```bash
cd ~/carlosfalcon-dev
python -m http.server 8080
# abre http://localhost:8080
```
