# Contrato de Ingestión de Puntuaciones: BAu Interactive

Este documento define la interfaz técnica y las garantías de seguridad que debe implementar el backend receptor de puntuaciones del videojuego para alimentar la clasificación canónica de Supabase.

---

## 1. Principio Fundamental
- **La web es 100% de solo lectura**: La aplicación web pública nunca inserta, modifica ni expone endpoints para enviar puntuaciones.
- **Canal de envío**: El videojuego (*Aether Drift*) o su servicio de juego enviará el resultado de una partida a una **Supabase Edge Function** autenticada o backend privado.

---

## 2. Endpoint de Ingestión (Edge Function)

- **Método**: `POST`
- **Ruta sugerida**: `https://<PROJECT_REF>.supabase.co/functions/v1/submit-score`
- **Cabeceras obligatorias**:
  ```http
  Authorization: Bearer <SUPABASE_USER_JWT>
  Content-Type: application/json
  apikey: <SUPABASE_ANON_KEY>
  ```

---

## 3. Especificación del Payload

```json
{
  "game_slug": "aether-drift",
  "client_submission_id": "c7b5f922-944a-4a61-9c3f-cfae090dfb22",
  "run_id": "run-20260910-48201-992",
  "score": 854200,
  "game_version": "0.9.5",
  "platform": "web",
  "client_timestamp": "2026-09-10T17:35:00Z"
}
```

### Campos y Validación:
1. `game_slug` *(string, obligatorio)*: Identificador único del juego en `public.games`.
2. `client_submission_id` *(UUID/string, obligatorio)*: Identificador único generado por el cliente por cada intento de envío para garantizar **idempotencia** ante reintentos de red.
3. `run_id` *(string, obligatorio)*: Identificador de la sesión de partida. No puede reutilizarse.
4. `score` *(entero positivo)*: Puntuación obtenida. Debe validar rangos verosímiles de gameplay (ej. `score >= 0 AND score <= 5000000`).
5. `game_version` *(string)*: Versión del ejecutable. Solo se aceptan versiones autorizadas activas.
6. `platform` *(string)*: `web`, `windows`, `android`, `ios`.

---

## 4. Garantías de Servidor y Antifraude

1. **Identidad derivada del JWT**: El servidor **nunca** confía en un `player_id` enviado en el cuerpo JSON. El `player_id` se extrae del token validado `auth.uid()`.
2. **Idempotencia estricta**: Si se recibe un `client_submission_id` repetido con idéntico payload, se devuelve el registro existente con código `200 OK`. Si el payload cambia para el mismo `client_submission_id`, se rechaza con `400 Bad Request`.
3. **Control de `run_id`**: Previene ataques de reproducción (replay attack). Una sesión consumida no puede volver a registrar puntos.
4. **Fechas canónicas**: El servidor genera y asigna `ranked_at = now()`. La fecha informada por el cliente solo se almacena con fines analíticos.
5. **Transacción Atómica en PostgreSQL**:
   - Inserta en `private.score_submissions` con estado `verified`.
   - Si `score > best_score` para `(game_id, player_id)` en `private.leaderboard_best`:
     Actualiza atómicamente `best_score`, `ranked_at` y `accepted_submission_id`.

---

## 5. Salida Pública Canónica (RPC)

Para consultar el Top 15, la web y el juego ejecutan la RPC pública:

```sql
SELECT * FROM public.get_public_leaderboard('aether-drift', 15);
```

**Resultado devuelto**:
| rank | display_name | score | ranked_at |
|---|---|---|---|
| 1 | VortexPilot | 985400 | 2026-09-10 15:30:00+00 |
| 2 | NeonRunner_99 | 942150 | 2026-09-10 12:45:00+00 |
| 3 | CyberSpecter | 895300 | 2026-09-10 09:15:00+00 |

*Nota: No se exponen IDs internos, correos, IPs ni datos de infraestructura.*
