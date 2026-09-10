# BAu Interactive — Portal Oficial de Videojuegos Independientes

Sitio web oficial de **BAu Interactive**, estudio independiente de desarrollo de videojuegos. Diseñado con una arquitectura escalable, estética retro-futurista de alto contraste y sistema canónico de clasificación mundial en tiempo real.

---

## 🚀 Características Principales

- **Next.js 15 & React 19**: App Router, Server Components y renderizado optimizado para Core Web Vitals (LCP < 2.5s).
- **Catálogo Escalable**: Diseñado para funcionar de forma impecable con un solo juego inicial (*Aether Drift*) y expandirse a futuros títulos sin modificar componentes.
- **Top 15 Canónico en Vivo**:
  - Polling inteligente cada 45 segundos que se pausa automáticamente cuando la pestaña está en segundo plano (`document.hidden`).
  - Detección de estados stale/desactualizados con reintento manual.
  - Reglas estrictas: 1 mejor marca por jugador, desempate por timestamp cronológico (`ranked_at`) y acotado a máximo 15 registros verificados.
- **Seguridad y Privacidad**:
  - Web pública 100% de solo lectura. Ningún secreto privilegiado se expone en el cliente.
  - Políticas estrictas de Row Level Security (RLS) en Supabase con separación de esquema público y privado (`private`).
  - Cabeceras de seguridad CSP completas, prevención de XSS y saneamiento de alias.
  - Contrato de ingestión atómico documentado en `docs/SCORE_INGESTION_CONTRACT.md`.
- **Accesibilidad WCAG 2.2 AA**: Navegación por teclado completa, foco visible, trampa de foco en menú móvil con cierre en tecla `Escape` y soporte para `prefers-reduced-motion`.

---

## 🛠️ Requisitos Previos

- **Node.js**: v18.18+ o superior (recomendado v20+)
- **NPM**: v9+ o superior
- **Git**
- **Proyecto en Supabase** (Opcional para desarrollo local, el sistema incluye dataset de respaldo de alta fidelidad).

---

## 📦 Instalación y Puesta en Marcha

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/BAu-0/BAu_Interactive.git
   cd BAu_Interactive
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Copia `.env.example` a `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *Nota: Si dejas las variables de Supabase por defecto, la aplicación funcionará inmediatamente usando el proveedor de datos de prueba integrado.*

4. **Ejecutar en modo de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🗄️ Configuración de Base de Datos (Supabase)

Si deseas conectar tu propio proyecto de Supabase:

1. Ve a tu panel de Supabase y abre el **SQL Editor**.
2. Ejecuta el archivo de migración inicial:
   [`supabase/migrations/20260910000000_initial_schema.sql`](file:///c:/proyectos/BAu_Interactive/supabase/migrations/20260910000000_initial_schema.sql)
3. Ejecuta el archivo de datos de semilla (Seed):
   [`supabase/seed.sql`](file:///c:/proyectos/BAu_Interactive/supabase/seed.sql)
4. Copia tu `Project URL` y tu `anon public key` a tu archivo `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-llave-anonima
   ```

---

## 🧪 Pruebas Automatizadas

El proyecto incluye pruebas unitarias con Vitest para validar las reglas canónicas del ranking y saneamiento:

```bash
npm run test
```

Para ejecutar las pruebas en modo observador:
```bash
npm run test:watch
```

---

## 🏗️ Compilación para Producción

Para validar que la compilación de producción se genera limpiamente:

```bash
npm run build
npm run start
```

---

## ☁️ Despliegue en Vercel

Este proyecto está 100% optimizado para Vercel:

1. **Desde GitHub**:
   - Conecta tu cuenta de Vercel con el repositorio `BAu-0/BAu_Interactive`.
   - Vercel detectará automáticamente la configuración de Next.js.
   - En la sección **Environment Variables**, añade las variables de `.env.example` si ya tienes Supabase configurado.
   - Pulsa **Deploy**.

2. **Desde la CLI de Vercel**:
   ```bash
   npx vercel
   npx vercel --prod
   ```

---

## 📄 Licencia

Código desarrollado para el portal oficial de **BAu Interactive**. Todos los derechos reservados.
