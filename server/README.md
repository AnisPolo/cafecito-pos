# Cafecito POS — API

Backend en Express 5 + Mongoose (ESM) con autenticación JWT.

## Cómo levantarlo

```bash
cd server
npm install
cp .env.example .env     # y completa los valores
npm run dev              # node --watch server.js
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `MONGODB_URI` | URI de conexión a MongoDB Atlas |
| `PORT` | Puerto del server (por defecto 5000) |
| `JWT_SECRET` | Secreto para firmar los tokens. Larga y aleatoria; ver abajo cómo generarla |
| `JWT_EXPIRES_IN` | Duración del token (por defecto `1d`) |

Genera un `JWT_SECRET` con:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Autenticación y autorización

- **Registro**: `POST /api/user/register` con `{ name, email, password }`. La contraseña debe tener al menos 8 caracteres y se guarda con bcrypt. El registro público siempre crea un usuario `client` sin descuento, aunque el body mande otro `role`.
- **Login**: `POST /api/user/login` con `{ email, password }`. Devuelve `{ token, user }`.
- **Uso del token**: en cada petición protegida, envía el header `Authorization: Bearer <token>`.
- **Errores**: sin token o con token inválido o vencido → `401`. Con un rol que no corresponde → `403`.
- Los endpoints de usuario nunca devuelven el campo `password`.

Los middlewares están en [middleware/auth.js](middleware/auth.js):

- `protect`: verifica el JWT y carga `req.user`.
- `requireRole(...roles)`: restringe por rol (`admin` o `client`).
- `requireSelfOrAdmin`: permite al admin o al propio usuario (según `:id`).

Para crear el primer admin, cambia el `role` del usuario directamente en la base de datos (o con un usuario admin ya existente vía `POST /api/user`).

## Rutas

Todas bajo `/api`.

| Método y ruta | Acceso |
|---|---|
| `POST /user/register`, `POST /user/login` | Pública |
| `GET /product` | Pública |
| `POST /product`, `PUT /product/:id`, `DELETE /product/:id` | Admin |
| `GET /user`, `POST /user`, `PUT /user/:id`, `DELETE /user/:id` | Admin |
| `GET /user/:id` | Admin o el propio usuario |
| `POST /cart`, `GET /cart`, `GET/PUT/DELETE /cart/:id` | Autenticado: el cliente solo ve y modifica sus carritos; el admin, todos |
| `POST /orderHistory`, `GET /orderHistory`, `GET /orderHistory/:id` | Autenticado: el cliente solo ve sus órdenes; el admin, todas |
| `PUT /orderHistory/:id`, `DELETE /orderHistory/:id` | Admin |

Reglas por rol en carritos y órdenes:

- El `user` del carrito sale del token. Solo un admin puede indicar otro.
- Un cliente no puede fijar el `status`; solo un admin.
- Para crear una orden, el carrito debe pertenecer a quien la crea.

## Seguridad

- **Rota la contraseña de Atlas.** La URI anterior estuvo escrita en `.env.example`. Cámbiala en Atlas (Database Access) y actualiza `MONGODB_URI` en `.env`.
- No subas `.env` a ningún repositorio. `.env.example` solo lleva placeholders.

## Pendiente (fuera de este alcance)

- `helmet`, `cors` con origen explícito, `express-rate-limit` (sobre todo en login y registro).
- Validación de input con `zod` y de `ObjectId` en `:id`.
- Recalcular `totalPrice` en el servidor y completar `middleware/discountVerify.js`.
- Montar `notFound` y `errorHandler` en `server.js`, y logging con `morgan`.
