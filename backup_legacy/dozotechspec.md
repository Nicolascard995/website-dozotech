# DOZO TECH 2026 - Visual FX & Interactive Specification

Este documento define exclusivamente el **comportamiento visual, animaciones y transiciones** del sistema Dozo Tech. No contiene copy ni lógica de negocio.

---

## 1. Identidad Digital (Look & Feel)

### 1.1 Base Visual
- **Modo:** Dark Mode Absoluto (Fondos `#0a0a0a` a `#000000`).
- **Acentos:**
  - **Neon Cyan (`#00FFFF`)**: Para elementos de alta tecnología y "futuro".
  - **Digital Mint (`#2cfad6`)**: Para éxito, validación y confianza.
  - **Error Red**: Para alertas de pérdidas financieras (dashboards).
- **Texturas:**
  - **Glassmorphism:** Paneles semitransparentes con `backdrop-blur-md` y bordes sutiles.
  - **Grain/Scanlines:** Texturas noise muy sutiles en fondos para evitar el "banding" y dar tacto analógico-digital.

### 1.2 Tipografía Dinámica
- **Títulos (Syne):** Bold, "Artistic", con tracking negativo.
- **Cuerpo (Space Grotesk):** Técnica, monospaced-feel, legible.
- **Números (Space Grotesk):** Siempre protagonistas. Deben usar `font-variant-numeric: tabular-nums` para animaciones de contadores.

---

## 2. Sistema de Animaciones (Core Motion)

### 2.1 Entradas (Page Load & Scroll)
- **Staggered Reveal:** Los elementos no aparecen todos a la vez. Entran en secuencia (cascada) con un delay de `100ms` entre hijos.
- **Dirección:**
  - Textos: `Fade In` + `Slide Up (20px)`.
  - Imágenes/Cards: `Scale (0.95 -> 1)` + `Fade In`.
- **Timing:** Curvas de bézier suaves (`ease-out`), duración ~0.6s.

### 2.2 Micro-Interacciones (Feedback)
- **Botones:**
  - *Hover:* Brillo interno ("Glow"), escala ligera (`1.05`).
  - *Click:* Efecto "Press" (`scale: 0.95`).
- **Cards (Bento Grid):**
  - *Hover:* Border shine (borde luminoso que sigue al mouse o rota).
  - *Tilt:* Efecto 3D sutil siguiendo la posición del cursor.

---

## 3. Transiciones por Componente

### 3.1 Hero Section
- **Fondo:** Video en loop continuo con overlay oscuro. Sin cortes bruscos (crossfade al cambiar video).
- **Efecto Glitch:** Cromática aberración muy sutil en el título principal al hacer hover o al cargar.
- **Scroll Down:** Indicador animado (flecha o mouse) que invita a bajar.

### 3.2 Methodology (Proceso de 3 Pasos)
- **Línea Conectora:** Una línea de luz que se "dibuja" (SVG path animation) conectando los pasos a medida que el usuario hace scroll.
- **Iconos:** Animan su trazo (draw in) o tienen un "pulse" suave.

### 3.3 About Section (La "Carta")
- **3D Flip:** Transición de 180° en el eje Y.
- **Trigger:**
  - *Automático:* 1s después de entrar en el viewport.
  - *Manual:* Al hacer clic en la tarjeta.
  - *Mouse Follow:* (Opcional) La tarjeta rota levemente siguiendo el mouse antes de girar.

### 3.4 Solutions Grid (Bento)
- **Spotlight:** Un foco de luz (`radial-gradient`) que sigue el cursor sobre las tarjetas, revelando bordes o texturas ocultas.
- **Contadores:** Los porcentajes (ej. "25%") deben animarse de 0 a 25 al entrar en pantalla ("CountUp").

---

## 4. Transiciones entre Páginas
- **Page Transitions:** Evitar el "hard refresh". Usar una transición de opacidad (`opacity: 0 -> 1`) entre rutas.
- **Exit Animations:** El contenido actual se desplaza suavemente hacia arriba (`y: -20px`, `opacity: 0`) antes de que cargue el nuevo.