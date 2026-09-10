# Prompt maestro para diseñar y desarrollar un portal de videojuegos independiente

> Entregar este documento completo a la persona responsable de diseño y desarrollo. Los textos entre corchetes son datos pendientes que debe proporcionar el propietario del proyecto. No se deben inventar nombres, juegos, enlaces, testimonios, cifras ni fechas de lanzamiento.

## 1. Datos que deben completarse

| Variable | Qué se necesita | Comportamiento mientras falte |
|---|---|---|
| `[NOMBRE_DEL_ESTUDIO]` | Nombre público del proyecto o estudio | Usar una etiqueta interna neutra; no publicarla |
| `[NOMBRE_DEL_JUEGO]` | Título del primer juego | Usar contenido de demostración claramente marcado |
| `[ESLOGAN]` | Frase breve de marca o del juego | Proponer opciones para aprobación, no publicarlas sin validar |
| `[DESCRIPCION_CORTA]` | Una o dos frases sobre el juego | Mostrar texto temporal solo en desarrollo |
| `[DESCRIPCION_COMPLETA]` | Género, objetivo, mecánicas y diferenciadores | Dejar preparado el campo en el gestor de contenido |
| `[LOGO_E_IDENTIDAD]` | Logo, icono, colores y tipografías, si existen | Diseñar una dirección visual provisional y original |
| `[CAPTURAS_Y_KEY_ART]` | Portada, capturas, GIF y/o tráiler | Usar placeholders locales con la proporción final indicada |
| `[URL_DE_LA_BETA]` | Enlace desde el que se prueba o descarga la beta | Ocultar el CTA; no crear un enlace falso |
| `[URL_DE_FEEDBACK]` | Hilo de Reddit, formulario o canal para comentarios | Ocultar el CTA secundario hasta configurarlo |
| `[ANDROID_URL]` | Ficha oficial en Google Play | Ocultar el badge hasta que la URL exista |
| `[IOS_URL]` | Ficha oficial en App Store | Ocultar el badge hasta que la URL exista |
| `[REDES_SOCIALES]` | Plataformas y URLs oficiales | Mostrar solo redes activas con URL válida |
| `[EMAIL_O_URL_DE_SOPORTE]` | Medio de contacto o soporte | Ocultar “Soporte” hasta configurarlo |
| `[DOMINIO]` | Dominio definitivo | Usar el dominio de preview solo en entornos de prueba |
| `[IDIOMA_INICIAL]` | Recomendado: español | Preparar la arquitectura para inglés sin mostrar un selector incompleto |
| `[MODO_DE_CLASIFICACION]` | Recomendado: mejor marca por jugador | Ver reglas del Top 15 en la sección 8 |
| `[ALCANCE_DE_PUNTUACIONES]` | Predeterminado: la web solo consume/documenta la clasificación; alternativa: construir también el backend de recepción | Las tablas privadas, antifraude y pruebas de ingestión son condicionales |
| `[SUPABASE_EXISTENTE]` | URL/proyecto, esquema y RPC existentes, si ya los hay | No crear una segunda fuente de verdad sin revisarlo |
| `[MODO_DE_ADMINISTRACION]` | Recomendado para el MVP: Supabase Dashboard; alternativa: panel privado propio | Documentar un flujo seguro y dejar el panel propio como mejora si no es necesario ahora |
| `[PROVEEDOR_DE_HOSTING]` | Recomendado: uno compatible con el framework elegido | Documentar la decisión y sus costos |

## 2. Encargo

Quiero que diseñes y desarrolles desde cero el sitio web oficial de `[NOMBRE_DEL_ESTUDIO]`, un proyecto independiente dedicado a crear videojuegos. En este momento existe un solo juego terminado, `[NOMBRE_DEL_JUEGO]`, que entrará en una beta pública y será compartido en comunidades como Reddit para obtener comentarios, detectar problemas y mejorar todo lo razonable antes de su lanzamiento final.

El sitio debe funcionar desde el primer día con un solo juego, sin parecer vacío, y debe poder crecer después para incluir más juegos, actualizaciones, proyectos en desarrollo, enlaces de descarga, redes sociales y clasificaciones independientes por juego.

La referencia conceptual es [Miniclip](https://www.miniclip.com/): tomar como inspiración la claridad de su portada, el protagonismo del arte de los juegos, el acceso rápido para jugar, su catálogo y la sección de novedades. No copiar su identidad, composición exacta, textos, código, imágenes, colores de marca ni recursos. Este proyecto necesita una personalidad original y apropiada para un estudio independiente mucho más pequeño.

No incluir secciones corporativas como “Careers”, vacantes, publishing, relaciones con inversionistas ni cuentas públicas de usuario. Tampoco crear páginas vacías para aparentar que ya existen más juegos.

## 3. Objetivos del sitio

El resultado debe:

1. Presentar el estudio y el juego con una identidad profesional y memorable.
2. Llevar al visitante a probar la beta y enviar comentarios con la menor fricción posible.
3. Publicar noticias, notas de versión, bitácoras de desarrollo y anuncios.
4. Mostrar un Top 15 por juego alimentado por la misma fuente canónica de Supabase que utilizará el videojuego.
5. Preparar la futura publicación en Google Play y App Store sin mostrar botones inactivos.
6. Dar espacio a proyectos futuros únicamente cuando haya información real para publicar.
7. Funcionar muy bien en teléfono, tableta y escritorio.
8. Ser rápido, accesible, seguro, fácil de mantener y preparado para posicionamiento y difusión en redes.

### Frontera de alcance

| Nivel | Incluye |
|---|---|
| **MVP web obligatorio** | Sitio público responsive, hero y ficha del juego, adelanto y página del Top 15, novedades, futuros proyectos condicionales, enlaces condicionales, contenido editorial en Supabase, lectura segura del ranking canónico, administración mediante Supabase Dashboard, SEO, accesibilidad, pruebas y documentación de despliegue |
| **Condicional: backend de puntuaciones** | Tablas privadas de partidas, autenticación del jugador, endpoint de recepción, idempotencia, validaciones, moderación técnica, proyección de mejores marcas y pruebas de concurrencia; implementarlo solo si `[ALCANCE_DE_PUNTUACIONES]` lo incluye |
| **Fase 2 opcional** | Panel `/admin` propio, publicación programada, Realtime avanzado, varios idiomas, temporadas, cuentas públicas y otras funciones enumeradas fuera del alcance inicial |

La cotización y el plan deben separar estos tres niveles. La ausencia de un backend de ingestión en el contrato web no exime de definir la interfaz de lectura ni de confirmar quién proporciona la RPC o vista canónica.

## 4. Audiencia y tono

La audiencia inicial son jugadores que llegarán desde Reddit, redes sociales o enlaces directos y que todavía no conocen el estudio. La página debe explicar rápidamente:

- qué juego es;
- por qué vale la pena probarlo;
- que se encuentra en beta;
- dónde jugarlo o descargarlo;
- cómo dejar comentarios;
- quiénes ocupan los primeros lugares.

El tono editorial debe ser cercano, entusiasta y honesto. Evitar lenguaje corporativo, promesas exageradas y frases genéricas como “el mejor juego del mundo”. Indicar con claridad qué está disponible, qué está en beta y qué es solo un plan futuro.

## 5. Dirección visual y experiencia

Crear una identidad visual propia tomando el juego como punto de partida. Si todavía no hay manual de marca, presentar una propuesta breve de dirección visual antes de cerrar la interfaz: paleta, tipografías, formas, tratamiento de imágenes, botones y ejemplos de tarjetas.

Principios recomendados:

- apariencia de portal de videojuegos moderno, con fondo oscuro o neutro de alto contraste y uno o dos acentos derivados del arte del juego;
- titulares grandes y breves, texto fácil de escanear y capturas como protagonistas;
- encabezado fijo o semitransparente que se compacte al desplazarse, sin tapar contenido;
- tarjetas de juegos y noticias con jerarquía clara, bordes o sombras discretas y estados interactivos visibles;
- movimiento sutil y funcional; respetar `prefers-reduced-motion`;
- no reproducir música ni video automáticamente;
- no usar un carrusel automático mientras exista un solo juego: una composición hero estática será más clara y rápida;
- CTA principal visible en la primera pantalla de móvil;
- Top 15 legible en móvil sin obligar a desplazamiento horizontal;
- iconografía consistente y controles con etiquetas comprensibles;
- no depender solo del color para comunicar estado, rango o selección.

Diseñar al menos para anchos aproximados de 360, 768, 1024 y 1440 píxeles. El contenido no debe romperse con nombres largos, puntuaciones grandes, noticias sin imagen o traducciones más extensas.

Preparar una guía de exportación de assets con, como mínimo, hero horizontal para escritorio, recorte vertical para móvil, miniatura 16:9 para juego/noticias y una imagen Open Graph de 1200 × 630. Definir zona segura y punto focal para que el personaje, logo o elemento principal no se corte. Conservar originales de mayor resolución y generar variantes optimizadas durante el build.

## 6. Arquitectura de información y navegación

Navegación pública propuesta:

- Inicio
- Juego, enlazado directamente a la ficha mientras solo exista uno; cambiar a Juegos al publicar un segundo título
- Clasificación
- Novedades, cuando exista al menos una publicación
- Próximos proyectos, solo cuando exista al menos uno publicado
- Acerca del estudio, como sección de Inicio o página breve
- Soporte/Contacto, solo cuando exista un canal real

Rutas recomendadas:

- `/` — Inicio
- `/juegos` — Catálogo escalable; activarlo en navegación al publicar un segundo juego y, mientras tanto, omitirlo o redirigirlo de forma clara a la ficha única
- `/juegos/[slug]` — Ficha individual de cada juego
- `/clasificacion` — Clasificación por juego, con selector cuando haya varios juegos
- `/novedades` — Archivo de noticias y actualizaciones
- `/novedades/[slug]` — Artículo individual
- `/acerca` — Opcional al inicio; puede ser una sección de la portada
- `/privacidad` — Información real sobre los datos tratados
- `/terminos` — Condiciones aplicables al sitio y a la clasificación
- `/admin` — Solo si se aprueba un panel propio en una segunda fase; nunca enlazarlo como opción pública principal

El menú móvil debe abrirse con un botón accesible, bloquear correctamente el foco dentro del panel, cerrarse con `Escape` y anunciar su estado a lectores de pantalla.

## 7. Requisitos por página

### 7.1 Inicio

Orden recomendado:

1. **Hero del juego destacado**
   - key art o captura optimizada;
   - etiqueta visible “Beta” mientras corresponda;
   - nombre, descripción de una frase y estado/plataformas;
   - CTA principal “Probar la beta” o “Jugar ahora”, solo con URL válida;
   - CTA secundario “Enviar comentarios”, solo con canal válido;
   - no mostrar badges de tiendas antes de que las fichas sean públicas.
2. **Adelanto del Top 15 del juego destacado**
   - mostrar en portada solo entre tres y cinco puestos y un enlace al Top 15 completo;
   - incluir hora de última actualización y botón de reintento ante errores.
3. **Actualización destacada**
   - noticia o nota de versión más reciente, con fecha, categoría, resumen e imagen opcional;
   - ocultar el módulo si todavía no existe una publicación; si ya hay varias, se pueden añadir hasta dos tarjetas compactas y un enlace al archivo.
4. **Características y galería breve del juego**
   - complementar el hero con información útil, sin repetir el mismo título y descripción en otro bloque completo.
5. **Próximos proyectos**
   - solo si existen registros publicados; no inventar títulos ni utilizar tarjetas “misteriosas” sin aprobación.
6. **Comunidad**
   - enlace a Reddit, Discord, formulario u otras redes únicamente cuando estén configurados.
7. **Footer compacto**
   - logo/nombre, navegación útil, redes activas, soporte, privacidad, términos y copyright dinámico.

### 7.2 Catálogo de juegos

- Debe verse intencional aunque solo contenga un juego.
- Cada tarjeta incluye imagen, título, descripción breve, estado (`Beta`, `Disponible`, `Próximamente`, etc.) y plataformas reales.
- No mostrar filtros ni paginación hasta que el volumen de contenido los justifique.
- Dejar el modelo preparado para ordenar juegos destacados y añadir nuevos registros sin cambiar el código de la interfaz.

### 7.3 Ficha del juego

Incluir:

- hero propio;
- nombre, género, estado, versión y descripción;
- CTA de beta o descarga, según disponibilidad;
- badges oficiales de App Store y Google Play solo con URL real;
- galería accesible de capturas y video opcional bajo acción del usuario;
- características principales;
- adelanto de tres a cinco puestos con enlace al Top 15 completo de ese juego;
- noticias y notas de versión relacionadas;
- plataformas y requisitos solamente si se han proporcionado;
- canal de feedback/soporte real;
- metadatos sociales específicos para compartir la ficha.

### 7.4 Clasificación

- Mostrar hasta 15 posiciones elegibles por juego: 15 cuando existan al menos 15 y todas las disponibles cuando haya menos.
- Destacar visualmente los tres primeros puestos sin reducir la legibilidad de los demás.
- Columnas públicas recomendadas: posición, nombre visible, puntuación y fecha de la marca. Plataforma y versión son opcionales y deben ocultarse en móvil si falta espacio.
- Usar números formateados según el idioma y fechas comprensibles; guardar fechas internamente en UTC.
- Si solo hay un juego, no mostrar un selector redundante.
- Incluir estados de carga, sin resultados, conexión fallida, datos desactualizados y reintento.
- Mostrar “Última actualización” y explicar en una frase que solo se publican puntuaciones verificadas.
- No exponer correo, IP, identificadores internos, tokens, datos antifraude ni cualquier otro dato personal o técnico.

### 7.5 Novedades

- Admitir al menos las categorías: anuncio, actualización, notas de versión y desarrollo.
- Listar artículos publicados en orden cronológico descendente.
- Cada artículo tiene `slug`, título, resumen, cuerpo, categoría, fecha, imagen de portada opcional, autor opcional y datos SEO.
- El cuerpo puede gestionarse como Markdown o contenido enriquecido, pero debe sanearse antes de mostrarse.
- Añadir relación opcional con uno o varios juegos.
- No mostrar categorías vacías ni paginación si todavía hay pocos artículos.
- Si aún no existe ninguna publicación, ocultar Novedades en la portada y navegación en vez de presentar un archivo vacío.
- Preparar enlaces para compartir sin incorporar rastreadores invasivos.

### 7.6 Acerca, soporte y legales

- “Acerca” debe contar brevemente quién hace el proyecto, qué tipo de juegos quiere crear y cómo seguir su evolución. No fabricar una historia de estudio.
- “Soporte” puede ser un enlace externo, correo protegido contra abuso o formulario; elegir solo una opción real y mantenible.
- Privacidad y términos deben describir el tratamiento verdadero de alias, puntuaciones, fechas, datos técnicos y analítica. No publicar textos legales genéricos presentándolos como asesoría jurídica.
- Mostrar aviso de cookies únicamente si se utilizan cookies o tecnologías no esenciales que lo requieran.

## 8. Definición funcional del Top 15

La web no debe mantener una clasificación separada: debe consultar la misma fuente canónica de Supabase que utiliza el juego.

“Global” significa reunir a todos los jugadores elegibles del juego seleccionado; nunca comparar puntuaciones de juegos distintos entre sí.

Regla predeterminada recomendada:

- una sola posición por jugador y por juego, usando su mejor puntuación verificada;
- ordenar por `score` descendente;
- resolver empates con `ranked_at` ascendente —una marca de tiempo confiable asignada por servidor al aceptar o verificar el resultado— y después con un identificador estable;
- calcular la posición al consultar, no guardarla como un valor que pueda quedar desactualizado;
- excluir puntuaciones rechazadas, ocultas o pendientes y jugadores bloqueados; deshabilitar una versión impide nuevos envíos, pero no invalida automáticamente marcas históricas salvo una decisión explícita de moderación.

El MVP asume que una puntuación mayor es mejor. Si la métrica real del juego funciona al revés —por ejemplo, menor tiempo—, definir `score_order` por juego antes de implementar y utilizar esa misma regla en web, juego y pruebas.

Si `[MODO_DE_CLASIFICACION]` se define como “todas las partidas”, permitir que un mismo jugador aparezca más de una vez. Esta decisión debe estar centralizada y probada; no debe resolverse de forma diferente en el juego y en la web.

En ese modo alternativo, la función canónica debe ordenar directamente las entregas aceptadas del historial privado. `private.leaderboard_best` se utiliza solo para el modo recomendado de mejor marca por jugador; no debe forzarse para representar dos modelos diferentes.

La persona desarrolladora debe documentar en una sola especificación compartida:

- qué representa la puntuación y su rango válido;
- si una puntuación mayor siempre es mejor;
- identidad estable y seudónima del jugador;
- longitud y caracteres válidos del nombre visible;
- regla de empates;
- versiones y plataformas permitidas;
- formato de fechas y zona horaria;
- mecanismo para ocultar o moderar resultados;
- política de actualización y caché.

Actualización del MVP, con el objetivo de mostrar una puntuación aceptada en un máximo de 60 segundos mientras la pestaña esté visible:

- cargar el ranking inicial desde el servidor para evitar una pantalla vacía y acelerar la primera presentación; decidir expresamente si los alias deben indexarse;
- como implementación sencilla recomendada, volver a consultarlo cada 30 a 60 segundos mientras la pestaña esté visible;
- pausar consultas cuando la pestaña esté oculta;
- permitir actualización manual;
- conservar el último resultado válido si una actualización falla y marcarlo como posiblemente desactualizado;
- evitar parpadeos o reordenamientos innecesarios.

Para soportar picos de visitas desde Reddit, no multiplicar innecesariamente una consulta pesada por cada visitante: usar una respuesta compartida con caché/revalidación corta o una consulta RPC eficiente, intervalo configurable y backoff ante fallos. Definir “Última actualización” como la hora en que el navegador recibió por última vez un ranking válido, diferenciándola si se muestra también la hora de generación del ranking.

Supabase Realtime puede utilizarse ahora o añadirse después si el volumen y la experiencia lo justifican. Si se implementa, debe estar protegido, provocar una nueva lectura de la clasificación canónica y mantener un mecanismo de recuperación; el cliente no debe reconstruir el orden confiando ciegamente en eventos individuales.

## 9. Supabase: modelo de datos propuesto

Crear migraciones reproducibles, datos de demostración claramente identificados y documentación. Los nombres pueden ajustarse, pero deben conservarse estas responsabilidades. Para el MVP estrictamente web son obligatorios `games`, `game_links`, `news_posts`, configuración/redes y una fuente pública canónica del ranking. Las tablas privadas de partidas descritas más abajo solo se implementan si el backend de puntuaciones está incluido en el contrato; aun así, su interfaz debe quedar documentada.

Usar UUID, fechas `timestamptz` en UTC, claves foráneas, restricciones `NOT NULL`/`CHECK` y reglas `ON DELETE` explícitas donde correspondan.

### `games`

- `id` UUID, clave primaria
- `slug` único
- `title`
- `short_description`
- `full_description`
- `status`: por ejemplo `beta`, `released`, `coming_soon`, `paused`
- `cover_image_path`, `hero_image_path`, `trailer_url`
- `display_version`, solo para el texto público; las versiones admitidas para enviar puntuaciones pertenecen al backend
- `leaderboard_enabled`, `leaderboard_mode`, `score_order`, `score_label`
- `release_date` opcional
- `featured`, `sort_order`
- `published_at`, `created_at`, `updated_at`

### `game_links`

- `id`, `game_id`
- `type`: por ejemplo `beta`, `play`, `google_play`, `app_store`, `steam`, `itch`
- `url`, `enabled`, `sort_order`

Separar los enlaces evita modificar el esquema cada vez que se añade una plataforma. Un registro deshabilitado o sin URL nunca debe producir un botón público.

### `news_posts`

- `id`, `slug` único, `title`, `excerpt`, `body`
- `category`
- `cover_image_path`, `cover_alt`
- `status`: `draft`, `published`, `archived`; añadir `scheduled` solo si se implementa un mecanismo real basado en `published_at` y revalidación/tarea programada
- `author_name` opcional
- `seo_title`, `seo_description`
- `published_at`, `created_at`, `updated_at`

En el MVP basta una relación opcional con un juego. Crear una tabla intermedia para varios juegos por artículo únicamente cuando exista esa necesidad real.

### Modelo de puntuaciones condicionado al alcance

Las siguientes tablas sirven como diseño recomendado si la misma persona también construye o modifica el backend que recibe puntuaciones. Si el backend ya existe o corresponde a otra persona, no duplicarlo: consumir su vista/RPC pública y entregar solamente el contrato y los requisitos de acceso.

### `player_profiles`

- `id` UUID seudónimo y estable
- `display_name`
- `normalized_display_name` si hace falta buscar o moderar
- `avatar_path` y `country_code`, solo si se decide utilizarlos
- `created_at`, `updated_at`

Guardar bloqueos, razones y demás datos de moderación en un área privada o negar expresamente su lectura directa; no son información de perfil pública.

No guardar correo u otros datos personales en esta tabla salvo que haya una necesidad aprobada, una política de privacidad y un flujo de eliminación.

Si el juego utiliza Supabase Auth, vincular el perfil a la identidad autenticada y derivar siempre el jugador del JWT validado; nunca aceptar un `player_id` arbitrario dentro del cuerpo de una petición. Para la beta puede evaluarse el acceso anónimo, documentando que esa identidad puede perderse al borrar datos, cerrar sesión o cambiar de dispositivo.

### `private.score_submissions`

- `id` UUID
- `game_id`, `player_id`
- `run_id` único por juego para identificar y consumir una sesión de partida, si ese mecanismo existe
- `client_submission_id` único en el ámbito acordado para hacer idempotentes los reintentos de red
- `score` como entero de capacidad suficiente y con restricción de rango
- `platform`, `game_version`
- `claimed_achieved_at` opcional si el cliente informa una fecha; `ranked_at` y `submitted_at` confiables, asignados por servidor
- `verification_status`: `pending`, `verified`, `rejected`, `hidden`
- `rejection_reason` o señales internas en un esquema/campo no público
- metadatos técnicos mínimos, privados y con retención definida, solo si son necesarios

Mantener el historial de partidas en un esquema privado no expuesto a la Data API. Si el flujo de envío necesita sesiones de partida, crear también `private.game_builds` y `private.score_runs` para versiones admitidas, nonces de un solo uso, caducidad y consumo atómico.

### `private.leaderboard_best`

- una fila por `game_id` y `player_id` cuando se utilice el modo de mejor marca;
- `best_score`, `ranked_at`, `accepted_submission_id`, `updated_at`;
- nombre público aprobado o snapshot controlado, si la política de cambio de alias lo requiere;
- clave única o primaria compuesta por juego y jugador.

Actualizar esta proyección únicamente desde una operación confiable de servidor. No almacenar el número de puesto. Crear índices adecuados para juego, puntuación descendente, fecha ascendente y jugador. No enviar todos los registros al navegador para ordenar allí.

Revocar a clientes públicos la lectura y toda escritura directa sobre esta tabla, ya que contiene identificadores internos. El público solo debe recibir los campos aprobados mediante la función canónica. Al bloquear un jugador, la función debe consultar su estado actual o la operación de moderación debe retirar atómicamente su proyección.

### Configuración editorial

Utilizar `site_settings` y/o `social_links` para datos que deban cambiar sin desplegar código: eslogan, enlaces, CTA, redes activas, soporte y metadatos generales. No convertir secretos ni variables de infraestructura en contenido editable.

### Fuente pública de clasificación

Exponer una función SQL/RPC canónica, por ejemplo `get_public_leaderboard(game_slug, limit)`, que:

- valide cualquier parámetro `limit`, lo acote entre 1 y 15 y devuelva como máximo 15 filas elegibles;
- aplique la regla de mejor puntuación por jugador o todas las partidas, según configuración;
- filtre solo registros públicos y verificados;
- devuelva únicamente `rank`, `display_name`, `score`, `ranked_at` y campos opcionales aprobados;
- aplique los desempates en la base de datos;
- use `private.leaderboard_best` en modo de mejor marca o las entregas aceptadas en modo de todas las partidas;
- si necesita leer un esquema privado mediante `SECURITY DEFINER`, fije `search_path = ''`, cualifique todos los nombres de esquema, revoque `EXECUTE` de `public` y lo conceda explícitamente solo a los roles de lectura previstos;
- si en su lugar se utiliza una vista sobre tablas con RLS, configurarla con `security_invoker = true` y permisos mínimos; una vista no tiene políticas RLS propias;
- tenga pruebas de acceso directo y por RPC;
- produzca el mismo resultado que consume el juego.

## 10. Contrato de puntuaciones y seguridad

La página pública será de solo lectura para las puntuaciones. No crear en la web un formulario ni una llamada directa que permita insertar, modificar o borrar resultados.

El juego deberá enviar resultados a un endpoint de servidor o Supabase Edge Function. Este encargo no incluye modificar el código del juego. Sí incluye acordar y documentar el contrato para que el sitio y el juego compartan la misma clasificación; implementar el endpoint solo si la responsabilidad de ingestión forma parte del alcance contratado. Un contrato posible incluye:

- identificador del juego;
- identidad autenticada del jugador, derivada por el servidor del JWT y nunca elegida mediante un `player_id` en el cuerpo;
- alias tomado de un perfil aprobado o actualizado por un flujo separado y validado;
- puntuación;
- identificador único de la sesión de partida, si se utiliza;
- identificador de envío generado por el cliente para reintentos idempotentes;
- versión y plataforma;
- token de sesión o prueba de integridad, cuando exista.

Si la operación de recepción forma parte del alcance, debe ser atómica, idempotente y validada en servidor. Debe mantener la verificación JWT activa. El servidor asigna la fecha de recepción y no confía por sí solo en puntuación, fecha, versión, nombre o identificadores enviados por un cliente. Aplicar, según lo que permita el juego:

- límites de frecuencia por jugador/sesión y, si es proporcional y se informa, por origen;
- `run_id` de un solo uso para impedir repetición de una sesión, si se implementan sesiones de partida;
- `client_submission_id` único para que un reintento idéntico devuelva el resultado previo sin duplicarlo; reutilizarlo con un payload diferente debe rechazarse;
- rangos y reglas de plausibilidad específicos de cada juego;
- lista de versiones y plataformas aceptadas;
- estado pendiente o rechazo para valores anómalos;
- registros de auditoría con retención limitada;
- moderación de alias y protección frente a suplantación;
- atestación de plataforma o validación más fuerte cuando se publique en tiendas.

No afirmar que una firma o secreto incluido dentro del ejecutable vuelve imposible hacer trampas. Documentar las limitaciones del método elegido y diseñar moderación y revocación.

Seguridad obligatoria de Supabase:

- activar Row Level Security en toda tabla expuesta y configurar también los permisos de base de datos con mínimo privilegio;
- crear cualquier vista pública con `security_invoker = true` cuando esté disponible o aislarla detrás de una función revisada; las vistas no obtienen políticas RLS propias y no deben eludir las políticas de sus tablas;
- permitir al público leer únicamente juegos/noticias publicados y la salida limitada de la clasificación;
- negar al rol público cualquier escritura de puntuaciones, contenido, perfiles, configuración y archivos;
- mantener claves secretas o equivalentes con privilegios elevados solo en operaciones de servidor que realmente las necesiten, después de autenticar y autorizar; jamás enviarlas al navegador, al juego compilado ni al repositorio;
- utilizar una clave publicable actual (`sb_publishable_*`) junto con RLS para todas las lecturas públicas, incluidas las realizadas mediante SSR; reservar `sb_secret_*` para ingestión o administración elevada y no basar una implementación nueva en las claves heredadas `anon`/`service_role`;
- si se construye un panel propio, protegerlo con Supabase Auth y una tabla privada de administradores o `app_metadata` controlada por servidor; no usar `user_metadata` como autorización ni asumir que el rol `authenticated` identifica a un administrador;
- tratar el acceso administrativo y la identidad del juego por separado: el panel no tendrá registro público, aunque el juego pueda utilizar Auth anónimo con controles contra abuso;
- separar recursos publicados de borradores cuando sea necesario; un bucket público permite leer un objeto a quien conozca su URL aunque el artículo siga en borrador;
- definir políticas de Storage para que el público lea solo recursos publicados y solo administradores suban o borren archivos;
- sanear Markdown/HTML, escapar nombres visibles y aplicar una política de seguridad de contenido razonable;
- validar tipos, tamaños y formatos de archivos;
- configurar encabezados de seguridad apropiados, incluyendo CSP con `frame-ancestors`, HSTS en producción, `X-Content-Type-Options: nosniff`, `Referrer-Policy` y `Permissions-Policy`;
- probar casos permitidos y denegados de RLS antes del despliegue;
- incluir `.env.example` sin valores secretos y excluir los archivos locales de entorno del control de versiones.

## 11. Gestión de contenido

Para mantener razonable el alcance de un primer sitio personal, el modo predeterminado del MVP será administrar contenido con Supabase Dashboard y migraciones/seed, acompañado de una guía clara. No crear la ruta `/admin` en este modo. El flujo documentado debe cubrir:

- acceso seguro a la cuenta administrativa de Supabase;
- crear, editar, publicar y archivar noticias;
- editar información, estado, versión, imágenes y enlaces de cada juego;
- activar/desactivar redes y enlaces de tiendas;
- cargar imágenes con texto alternativo y ver sus proporciones recomendadas;
- revisar, verificar, ocultar o rechazar puntuaciones sospechosas sin borrarlas de inmediato;
- bloquear un alias/jugador cuando sea necesario y conservar una razón interna.

Si el propietario confirma que necesita una interfaz cotidiana más simple, cotizar un panel privado ligero como segunda fase. Ese panel puede añadir inicio de sesión restringido, previsualización, programación, advertencias de cambios sin guardar, confirmación de acciones destructivas y una experiencia editorial más guiada. No hace falta construir un CMS empresarial.

## 12. Estados y reglas de interfaz

Cada vista dependiente de datos debe tener, según corresponda:

- carga mediante skeleton o indicador no intrusivo;
- estado vacío con explicación útil;
- error con mensaje claro y acción de reintento;
- contenido no disponible sin romper el resto de la página;
- manejo de imágenes faltantes;
- estado offline o desactualizado para la clasificación.

El sitio completo debe incluir una página 404 con navegación de regreso y una pantalla de error general que no revele trazas, consultas ni configuración.

Los CTA deben ser condicionales:

- con beta disponible: “Probar la beta”;
- al cambiar de beta a lanzamiento, actualizar etiqueta, mensaje y CTA mediante datos/configuración, sin rediseñar la página;
- con ficha de tienda disponible: badge enlazado a la tienda correspondiente;
- con lanzamiento anunciado pero sin URL: texto de estado, no un botón falso;
- sin red social configurada: no renderizar su icono;
- enlaces externos: indicar correctamente su destino y aplicar atributos seguros.

## 13. Tecnología y calidad de implementación

Propuesta recomendada, salvo que exista una razón documentada para otra:

- Next.js con TypeScript estricto;
- renderizado en servidor o generación estática/revalidada para páginas públicas;
- Tailwind CSS o un sistema de estilos basado en tokens;
- cliente oficial de Supabase;
- Supabase Database, Auth, Storage y Edge Functions solo donde aporten valor;
- pruebas unitarias/integración y pruebas end-to-end de los recorridos críticos;
- despliegue en una plataforma compatible con el framework y variables de entorno seguras.

Requisitos de ingeniería:

- arquitectura por componentes reutilizables, sin crear una abstracción innecesaria para cada elemento;
- configuración y contenido separados de la presentación;
- consultas tipadas a partir del esquema de Supabase;
- validación de datos en límites de entrada;
- migraciones versionadas y probadas, con estrategia documentada de reversión o corrección hacia adelante y copia previa cuando un cambio pueda perder datos;
- registro de errores sin datos sensibles;
- dependencias justificadas y actualizadas;
- formato, lint y comprobación de tipos automatizados;
- sin errores ni advertencias evitables en consola;
- README que permita levantar el proyecto desde una instalación limpia.

No fijar versiones antiguas porque aparezcan en este documento: usar versiones estables compatibles al iniciar el proyecto y registrar las elegidas.

## 14. Rendimiento, accesibilidad y SEO

### Rendimiento

- Optimizar imágenes y entregar formatos modernos con dimensiones declaradas.
- Cargar de forma diferida lo que quede fuera de la primera pantalla.
- Evitar video de fondo pesado, bibliotecas de animación innecesarias y fuentes excesivas.
- Reducir el JavaScript enviado al cliente; el ranking no necesita convertirse en una aplicación compleja.
- Configurar caché y revalidación: noticias y fichas pueden almacenarse; el ranking debe cumplir el objetivo de frescura acordado, recomendado entre 30 y 60 segundos.
- Medir con Lighthouse en móvil y corregir los cuellos de botella principales. Objetivo de laboratorio con contenido real: al menos 90 en Accesibilidad, Buenas prácticas y SEO, y al menos 85 en Rendimiento en un entorno de prueba estable.
- Diseñar para los umbrales de Core Web Vitals: LCP ≤ 2.5 s, INP ≤ 200 ms y CLS ≤ 0.1; distinguir estas metas de campo de una medición aislada de laboratorio.

### Accesibilidad

- Cumplir WCAG 2.2 AA en las rutas principales.
- HTML semántico, jerarquía de encabezados y regiones correctas.
- Navegación completa por teclado y foco visible.
- Contraste suficiente y zoom sin pérdida de contenido.
- Textos alternativos útiles; imágenes decorativas con alternativa vacía.
- Etiquetas y mensajes de error asociados a controles.
- Animaciones reducidas cuando el sistema lo solicite.
- Probar al menos teclado y un lector de pantalla en los flujos críticos.

### SEO y difusión

- Título, descripción, canonical y Open Graph por página.
- Imagen social específica para inicio, juego y noticias.
- `sitemap.xml` y `robots.txt` correctos por entorno.
- datos estructurados apropiados, como `Person` si se presenta a un desarrollador individual o `Organization` si existe un estudio, además de `VideoGame`, `NewsArticle` y breadcrumbs, únicamente con datos reales;
- URLs legibles y slugs estables;
- página 404 útil y redirecciones cuando un slug cambie;
- vista previa correcta al compartir en Reddit y otras redes.

### Idiomas

El MVP puede publicarse solo en `[IDIOMA_INICIAL]`. Separar los textos de interfaz del código y preparar campos o una estrategia de contenido para añadir inglés más tarde. No mostrar selector de idioma hasta que todas las rutas y textos esenciales estén traducidos.

## 15. Privacidad, moderación y analítica

- Recolectar el mínimo de datos posible.
- Tratar el identificador del jugador como seudónimo, no como permiso para exponerlo.
- Definir cómo una persona puede solicitar corrección u ocultación de su nombre/puntuación.
- Documentar retención de señales antifraude y limitar acceso a ellas.
- Moderar nombres ofensivos, datos personales incluidos en alias e intentos de inyección/XSS.
- Si se incorpora analítica, preferir una solución respetuosa de la privacidad y registrar solo eventos útiles, sin puntuaciones ni identificadores personales.
- Eventos sugeridos: visita de ficha, clic en beta, clic en feedback, clic en tienda, clic en red y vista de clasificación.
- El banner de consentimiento debe responder a las tecnologías realmente usadas y a la normativa aplicable; no añadir uno decorativo.

Antes de publicar textos legales, solicitar una revisión apropiada para los países y tiendas donde se distribuirá el juego.

## 16. Pruebas mínimas

Automatizar y documentar como mínimo:

1. Orden del ranking según `score_order` acordado y desempates mediante `ranked_at` confiable e identificador estable.
2. Con al menos 20 jugadores y varias partidas, el modo elegido devuelve como máximo los 15 resultados correctos; en el modo recomendado no repite jugadores y conserva solo su mejor marca.
3. Exclusión de registros pendientes, rechazados, ocultos o bloqueados.
4. Casos con 0, 1, 14, 15 y más de 15 registros: devolver hasta 15 filas y nunca rellenar con datos ficticios.
5. Si se incluye la ingestión de puntuaciones: `run_id` reutilizado se rechaza y `client_submission_id` repetido devuelve el resultado previo sin duplicarlo.
6. Si se incluye la ingestión de puntuaciones: dos envíos concurrentes para la misma partida producen como máximo una aceptación.
7. RLS: lectura pública permitida solo donde corresponde y escrituras públicas denegadas.
8. No existe lectura directa pública de `private.leaderboard_best`, perfiles privados ni otras tablas del esquema `private`.
9. Acceso administrativo permitido al propietario y denegado al resto, incluido un usuario anónimo autenticado.
10. Publicación, borrador y, si se implementa, programación de una noticia.
11. CTA de beta, tiendas, soporte y redes visibles solo con URL válida.
12. Estados vacío, error, reintento y datos desactualizados; la pestaña oculta deja de sondear.
13. Un alias que contiene HTML o JavaScript se presenta como texto y nunca se ejecuta.
14. Navegación móvil, teclado, menú, foco y cierre con `Escape`.
15. La clasificación utiliza una tabla semántica con `caption` y encabezados; la actualización no roba el foco ni anuncia de nuevo las 15 filas.
16. Inicio, ficha, noticias, clasificación, legales y 404 en tamaños móvil y escritorio.
17. Metadatos y previews sociales sin contenido de demostración.

Usar datos de prueba que no puedan confundirse con jugadores o noticias reales. Limpiarlos o separarlos antes de producción.

## 17. Flujo de trabajo esperado

1. Revisar este brief y devolver una lista corta de datos faltantes, riesgos y decisiones que afecten costo o alcance.
2. Proponer mapa del sitio y wireframe responsive, priorizando el recorrido `llegada desde Reddit → entender el juego → probar beta → enviar feedback`.
3. Presentar una dirección visual original basada en los assets reales del juego.
4. Definir esquema, permisos y contrato canónico del ranking antes de conectar la interfaz.
5. Construir primero el recorrido público con datos de prueba identificados.
6. Integrar Supabase, políticas, migraciones y el modo de administración acordado.
7. Sustituir todo placeholder por contenido aprobado.
8. Ejecutar pruebas funcionales, de seguridad, accesibilidad, rendimiento y responsive.
9. Desplegar un preview para revisión y después producción.
10. Entregar documentación y una demostración del flujo editorial; incluir moderación si forma parte del alcance acordado.

Si una decisión no está definida, no la escondas dentro del código. Registra el supuesto, utiliza una configuración fácil de cambiar y pide aprobación antes de publicar.

## 18. Entregables

- código fuente completo y ordenado;
- diseño responsive implementado;
- componentes y tokens visuales reutilizables;
- proyecto/configuración de Supabase;
- migraciones, políticas RLS, funciones/RPC, índices y pruebas de base de datos correspondientes al alcance acordado;
- procedimiento seguro de gestión mediante Supabase Dashboard o, si se aprobó como segunda fase, panel privado;
- contrato documentado para que el juego envíe puntuaciones;
- `.env.example` sin secretos;
- datos de demostración separados o script de seed;
- pruebas automatizadas y resumen de resultados;
- configuración de despliegue y dominio;
- README con instalación, desarrollo, pruebas, publicación, copias de seguridad y recuperación;
- guía breve para publicar una noticia, añadir un juego y activar enlaces de tiendas/redes; incluir moderación de puntuaciones solo si esa operación forma parte del acceso o backend acordado;
- inventario de assets y licencias;
- lista final de asuntos pendientes, si existe alguno.

## 19. Criterios de aceptación

El trabajo se considera listo cuando:

- la portada comunica el juego y su estado en pocos segundos y funciona bien con un único título;
- no existe ninguna sección de Careers ni contenido corporativo irrelevante;
- si se proporcionan URLs de beta y feedback, el recorrido funciona con esos enlaces; si todavía no existen, los CTA no se renderizan y quedan anotados como pendientes de activación;
- los botones de Android, iOS y redes aparecen únicamente cuando están configurados;
- noticias y juegos publicados provienen de Supabase y pueden administrarse sin editar componentes;
- el Top 15 muestra exactamente el resultado de la consulta canónica y la misma regla acordada con el juego;
- la web pública no puede escribir directamente en las tablas de puntuaciones;
- ningún secreto privilegiado aparece en navegador, paquete del juego, repositorio o logs públicos;
- RLS y permisos tienen pruebas positivas y negativas;
- la clasificación mantiene el último valor válido, cumple una frescura máxima de 60 segundos en una pestaña visible y permite reintentar;
- móvil no presenta desbordamiento horizontal, CTA inaccesible ni tabla ilegible;
- las vistas públicas dependientes de datos tienen estados de carga, vacío y error apropiados; el sitio cuenta además con 404 global y metadatos correctos por ruta;
- navegación por teclado, foco, contraste, texto alternativo y movimiento reducido han sido verificados;
- no quedan textos “Lorem ipsum”, enlaces `#`, juegos ficticios, noticias de muestra ni imágenes sin licencia en producción;
- un tercero puede instalar, probar, desplegar y administrar el sitio siguiendo la documentación.

## 20. Fuera del alcance inicial

No incluir en el MVP, salvo aprobación expresa:

- modificaciones al videojuego;
- foro, chat o sistema de comentarios propio;
- perfiles y registro público de jugadores;
- pagos, tienda de objetos o suscripciones;
- tabla de posiciones por amigos;
- temporadas, torneos o recompensas;
- aplicación móvil del portal;
- newsletter y automatizaciones de marketing;
- traducciones no revisadas;
- integraciones sociales que requieran permisos amplios;
- un CMS empresarial.

La arquitectura no debe impedir estas funciones futuras, pero tampoco debe construirlas anticipadamente.

## 21. Restricciones explícitas

- No copiar Miniclip; usarlo solo como referencia de jerarquía y tipo de contenido.
- No inventar marca, nombres de proyectos, cifras, reseñas, fechas ni enlaces.
- No mostrar contenido o controles vacíos.
- No crear un carrusel para un solo juego.
- No usar autoplay de video o audio.
- No aceptar puntuaciones directamente desde el navegador público.
- No tratar una clave publicable de Supabase como mecanismo de autorización; la protección depende de permisos y RLS.
- No guardar secretos en código ni exponer claves privilegiadas.
- No prometer un sistema “imposible de hackear”; explicar los límites de la validación antifraude.
- No sacrificar accesibilidad, rendimiento o claridad por efectos visuales.

## 22. Preguntas que la persona responsable debe cerrar antes de producción

1. ¿Cuál es el nombre del estudio, del juego y su propuesta de valor en una frase?
2. ¿Dónde se prueba la beta y dónde se recopila el feedback?
3. ¿Qué assets finales existen y quién posee sus derechos?
4. ¿La clasificación muestra una mejor marca por jugador o las 15 mejores partidas aunque se repita un jugador?
5. ¿Cómo genera el juego un identificador estable y seudónimo?
6. ¿Qué puntuaciones, versiones y plataformas son válidas?
7. ¿Quién puede verificar, ocultar o rechazar resultados?
8. ¿El contenido inicial estará solo en español o también en inglés?
9. ¿Qué dominio, hosting, analítica y canal de soporte se usarán?
10. ¿La beta se juega en el navegador, se descarga o enlaza a otra plataforma?
11. ¿Ya existe el proyecto Supabase, su esquema y una RPC/vista de clasificación que deban conservarse?
12. ¿La persona contratada solo consumirá la clasificación o también construirá el backend que recibe puntuaciones?
13. ¿Qué volumen inicial se espera tras publicar en Reddit y cuáles son presupuesto y plazo del MVP?
14. ¿Qué información debe incluirse en privacidad y términos según la audiencia y distribución?

Estas preguntas no justifican inventar datos. Se puede avanzar con estructura, componentes y datos de prueba claramente separados, pero no publicar hasta haber sustituido y validado toda la información pendiente.

## 23. Referencias técnicas

- Referencia de estructura editorial: [Miniclip](https://www.miniclip.com/)
- Seguridad de datos en Supabase: [Securing your data](https://supabase.com/docs/guides/database/secure-data)
- Row Level Security: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Claves publicables y secretas: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)
- Autenticación anónima y sus límites: [Supabase anonymous sign-ins](https://supabase.com/docs/guides/auth/auth-anonymous)
- Opciones de actualización en tiempo real: [Supabase Realtime](https://supabase.com/docs/guides/realtime/subscribing-to-database-changes)
- Accesibilidad: [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- Métricas de experiencia: [Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds)
