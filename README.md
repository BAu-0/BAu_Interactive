# BAu Interactive — Portal Oficial de la Desarrolladora de Videojuegos

Sitio web oficial de **BAu Interactive**, estudio independiente de desarrollo de videojuegos creado por BAu. Diseñado con una arquitectura moderna, estética de alto contraste, catálogo escalable y presentación del juego insignia en turno: **Pok-Tschack**.

---

## 🚀 Características Principales

- **Next.js 15 & React 19**: App Router, Server Components y renderizado optimizado para Core Web Vitals (LCP < 2.5s).
- **Catálogo Escalable del Estudio**: Diseñado para albergar las producciones del estudio, destacando en portada el juego en turno (*Pok-Tschack*) con enlace directo a su beta en itch.io.
- **Top 15 de Telemetría**:
  - Polling inteligente cada 45 segundos que se pausa automáticamente cuando la pestaña está en segundo plano (`document.hidden`).
  - Detección de estados stale/desactualizados con reintento manual.
  - Reglas estrictas: 1 mejor marca por jugador, desempate por timestamp cronológico (`ranked_at`) y acotado a 15 registros.
- **Seguridad y Privacidad**:
  - Web pública 100% de solo lectura. Ningún secreto privilegiado se expone en el cliente.
  - Saneamiento de alias, prevención de XSS y cabeceras de seguridad.
  - Soporte para Supabase con dataset de respaldo de alta fidelidad integrado.
- **Accesibilidad WCAG 2.2 AA**: Navegación por teclado completa, foco visible, trampa de foco en menú móvil con cierre en tecla `Escape` y soporte para `prefers-reduced-motion`.

---

## 🎮 Juego Insignia en Turno: Pok-Tschack

- **Premisa**: Arcade vertical 2D de precisión y físicas inspirado en el juego de pelota mesoamericano. Golpea la pelota para hacerla cruzar un aro de piedra rotatorio con apertura cambiante; cada gol reinicia el reloj y prolonga la partida mientras la cancha introduce criaturas, trampas y desafíos.
- **Beta Pública**: Disponible en HTML5 para jugar en navegador en [itch.io](https://garanda.itch.io/pok-tschack-betav1).
- **Plataformas**: Web (HTML5) / En desarrollo activo para móviles Android.

---

## 🛠️ Requisitos Previos

- **Node.js**: v18.18+ o superior (recomendado v20+)
- **NPM**: v9+ o superior
- **Git**

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

## 🧪 Pruebas Automatizadas

El proyecto incluye pruebas unitarias con Vitest para validar las reglas de clasificación y saneamiento:

```bash
npm run test
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

Este proyecto está conectado a GitHub (`BAu-0/BAu_Interactive`) y se despliega automáticamente en Vercel ante cada push a la rama `main`.

---

## 📄 Licencia

Código desarrollado para el portal oficial de **BAu Interactive**. Todos los derechos reservados.
