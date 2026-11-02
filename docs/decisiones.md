# Tilde: decisiones del proyecto

Registro vivo de lo decidido sobre producto, UX, arquitectura y forma de trabajo. Cada decisión tiene su motivo. Si algo cambia, se actualiza acá con la fecha y el porqué; no se cambia en silencio en el código.

- Última actualización: 2 de noviembre de 2026
- Especificación de diseño: `docs/design/tilde-especificacion-diseno-v1.pdf`

---

## 1. Producto

**Tilde** es una app mobile para dejar constancia de lo que ya revisaste (la llave del gas, el auto, la puerta) y dejar de dudar. Está pensada para personas olvidadizas y para personas con TOC o dudas de verificación recurrentes.

- **Nombre:** Tilde (el ✓ en Argentina). Aparece en pocos lugares centralizados del código, por si cambia.
- **Idioma de la app:** español rioplatense. Todos los textos de interfaz viven en `src/i18n/es.ts`, nunca escritos dentro de los componentes, para poder sumar otros idiomas sin recorrer la app.
- **Idioma del código:** inglés (variables, funciones, archivos, tablas, commits técnicos de tipos).
- **Plataforma:** React Native con Expo. Primero Android en producción; iOS después con el mismo código.

### Principios de diseño

1. **Constancia, no un tilde.** Marcar deja un registro con la hora exacta. La hora es lo que tranquiliza.
2. **Calma por defecto.** Sin rojo, alarmas ni urgencia. Lo vencido vuelve a pendiente en silencio.
3. **Un toque.** Marcar es tocar el círculo. Todo lo demás es opcional.
4. **Una mano, también de noche.** Acciones en la mitad inferior y modo oscuro de primera clase.
5. **Lo automático se ve y se deshace.** Nada pasa sin que la persona pueda verlo o revertirlo.
6. **Nada que no sirva.** Sin decoración, rachas ni celebraciones.

---

## 2. Alcance por versión

| Versión | Incluye |
|---|---|
| **v1** (100 % local) | Ítems y listas, check con un toque, validez (opciones rápidas, personalizada, sin vencimiento), desmarcar con deshacer, foto opcional, historial por ítem, check compartido o por lista, avisos por horario con notificaciones locales, ajustes, bienvenida con plantillas. |
| **v1.1** | Validez y avisos por ubicación (geocercas), widgets, NFC, accesos de voz. Requiere development build. |
| **v2** | Backend (`api`): cuenta opcional, backup y sincronización entre dispositivos, listas compartidas. |

---

## 3. Decisiones de producto y UX

| # | Decisión | Motivo |
|---|---|---|
| D-01 | La fila de ítem tiene **dos zonas táctiles**: el círculo (toda la franja izquierda, 64 pt de ancho) marca y desmarca; el resto de la fila abre el detalle. | Es la convención de las apps de recordatorios que la gente ya conoce. |
| D-02 | Tocar el nombre de un ítem **verificado** abre el **comprobante**; de uno **pendiente**, el **panel de validez** (otra validez o foto). Mantener presionado es solo un atajo. | El toque largo no se descubre solo; nunca puede ser la única forma de llegar a algo. |
| D-03 | **Desmarcar no pide confirmación**: muestra un toast con «Deshacer» durante 5 s, que restaura el check original (hora y foto). | Es reversible. La confirmación queda solo para lo irreversible. |
| D-04 | **No existe «verificar todo».** | Cada check tiene que corresponder a una revisión real. |
| D-05 | **El orden de los ítems no cambia al marcar.** | La posición es memoria espacial. |
| D-06 | **Lo vencido no es rojo**: vuelve a pendiente y dice «Venció hoy 06:00» ese día. La barra de validez se acorta pero no cambia de color. | El rojo genera ansiedad, que es justo lo que la app quiere bajar. |
| D-07 | **Validez:** 1 h, 6 h, 24 h, «Hasta mañana» (fin configurable, 06:00 por defecto, entre 00:00 y 12:00), «Hasta que lo desmarque» y fecha y hora personalizada (entre 5 min y 30 días en el futuro). Cada ítem tiene su validez predeterminada; elegir otra al verificar aplica solo a ese check. | Cubre los casos reales sin hacer cuentas: cada opción muestra la hora exacta de fin. |
| D-08 | **Foto opcional**, nunca obligatoria. Se guarda comprimida solo en el teléfono. Si el archivo falta, el check sigue siendo válido. | La constancia es la hora; la foto es un refuerzo. |
| D-09 | **Check compartido o por lista (opción A).** Cada ítem tiene «Compartir el check entre listas», activado por defecto. Aparece solo si el ítem está en 2 o más listas. Desactivado, cada lista tiene su propio check. | Los estados («gas cerrado») se comparten; las preparaciones («llevar auriculares» al trabajo y a la facultad) no. Se revisa con feedback real. |
| D-10 | **Los ítems no llevan ícono**; las listas sí (12 opciones). | Filas más limpias y un campo menos al crear. |
| D-11 | **Cuatro pestañas:** Inicio (listas), Ítems (catálogo de todos los ítems), Avisos y Ajustes. | Ítems es donde viven los que no están en ninguna lista. |
| D-12 | **Selección con casilla cuadrada, verificación con círculo.** Nunca se intercambian. | El círculo significa «verificado» en toda la app. |
| D-13 | **Avisos solo si hay pendientes**, activado por defecto. La app reprograma el aviso cada vez que cambia el estado de la lista. | No molestar a quien ya revisó todo. |
| D-14 | **Historial de 90 días**, con limpieza automática al abrir la app. Las fotos se borran con su registro. | Limita el espacio ocupado. Confirmar antes de la fase 4. |
| D-15 | **Se guarda primero y se muestra después.** Si guardar falla, la fila no cambia y aparece un error con «Reintentar». | Un check visible que no existe rompe la confianza en la app. |
| D-16 | **Sin cuenta en la v1.** En la v2 será opcional y se ofrecerá desde Ajustes. | Cero fricción al empezar. |
| D-17 | **Permisos con contexto:** se piden recién cuando hacen falta, con una explicación antes. Si se niegan, se explica y se ofrece abrir los ajustes, sin insistir. | Respeto y mayor tasa de aceptación. |
| D-18 | **Sin spinners:** los datos son locales; no hay spinners. Esqueletos solo si algo tarda más de 300 ms. | La app tiene que sentirse instantánea. |

El detalle visual, los textos exactos y todos los estados por pantalla están en la especificación de diseño.

---

## 4. Arquitectura

### Local-first

- La base de datos de la v1 es **SQLite dentro del teléfono** y es la fuente de verdad.
- Las pantallas **nunca** llaman a la red. Leen y escriben en SQLite a través de repositorios.
- En la v2, la comunicación con el servidor queda aislada en `src/api/` y en el motor de sincronización `src/features/sync/`. La única excepción es lo que necesita al servidor en el momento (login), desde `features/auth`.
- Los vencimientos no necesitan procesos en segundo plano: cada check guarda `expiresAt` y «vigente» se calcula comparando con la hora actual.
- Todas las fechas se guardan como instante UTC; se muestran en la hora local del teléfono.

### Preparado para sincronizar

Desde la v1, cada tabla tiene:

- `id`: UUID generado en el teléfono.
- `createdAt`, `updatedAt`.
- `deletedAt`: borrado lógico, para poder sincronizar borrados.
- `syncedAt` (o flag `dirty`): qué falta subir. Se agrega en la v2 si no hace falta antes.

Conflictos en la v2: gana el último `updatedAt`.

### Modelo de datos inicial (a confirmar en la fase 2)

| Tabla | Campos principales |
|---|---|
| `lists` | `id`, `name`, `icon`, `position` |
| `items` | `id`, `name`, `defaultValidity` (tipo y valor), `shareCheckAcrossLists` |
| `list_items` | `listId`, `itemId`, `position` |
| `checks` | `id`, `itemId`, `listId` (null si el check es compartido), `checkedAt`, `expiresAt` (null = sin vencimiento), `validityKind`, `photoPath`, `uncheckedAt` |
| `reminders` | `id`, `listId`, `time`, `weekdays`, `onlyIfPending`, `enabled` |
| `settings` | clave y valor: validez por defecto, fin de «hasta mañana», tema, vibración |

El historial se deriva de `checks`: cada fila es una verificación, `uncheckedAt` registra el desmarcado y el vencimiento se deduce de `expiresAt`.

### Estilos

Decidido el 30 de octubre de 2026: **`StyleSheet` nativo de React Native + tema tipado propio, sin librerías de estilos.**

- Los tokens viven en `src/theme/` (`colors.ts` con variante clara y oscura, `typography.ts`, `spacing.ts`, `radius.ts`, `motion.ts`).
- Un `ThemeProvider` decide el modo (sistema, claro u oscuro, según Ajustes) y el hook `useTheme()` entrega los tokens del modo activo.
- Una utilidad propia, `createStyles((theme) => ({ ... }))`, arma los estilos de cada componente a partir del tema y los memoiza por modo.
- Los estilos viven sobre todo en `components/ui` y en los componentes de cada feature; las pantallas casi no definen estilos propios.

**Motivo:** el design system es chico y centralizado, así que la velocidad de escritura de Tailwind aporta poco. A cambio, se evita una dependencia que agrega configuración al build y puede romperse al actualizar Expo. Es además la forma estándar de React Native.

**Descartadas:** NativeWind (Tailwind para React Native) y librerías de design system (Unistyles, Tamagui, Restyle).

**Tokens agregados en la fase 1** (2 de noviembre de 2026), que no estaban en la especificación:

- `color.pressed`: fondo de una superficie tocable mientras el dedo está apoyado. `#E8EBE6` en claro, `#232925` en oscuro.
- `color.scrim`: velo detrás de paneles y diálogos. `rgba(16, 22, 19, 0.36)` en claro, `rgba(0, 0, 0, 0.55)` en oscuro.
- `color.onAccent`: texto e íconos sobre un fondo `accent` relleno (botón principal, trazo del check). `#FFFFFF` en claro, `#121614` en oscuro.
- `color.onDanger`: texto e íconos sobre un fondo `danger` relleno (botón destructivo del diálogo de confirmación). `#FFFFFF` en claro, `#121614` en oscuro.

### Configuración

Decidido el 2 de noviembre de 2026:

- **React Compiler activado** (`experiments.reactCompiler` en `app.json`). Memoiza automáticamente al compilar, así que no se escriben `useMemo`, `useCallback` ni `memo` a mano salvo un problema medido. Con el compilador activo, los shared values de Reanimated se usan con `.get()` y `.set()`, nunca con `.value`.
- **La web no es un destino:** sin `react-native-web` ni archivos `.web.tsx`.
- **`react-dom` se mantiene como dependencia** porque Expo Router lo requiere internamente. No se importa en el código ni entra en el bundle de iOS y Android. Su versión la controla el SDK (`npx expo install`) y no se modifica a mano.
- **Finales de línea LF en todo el repo**, definidos por `.gitattributes`.
- **Dependencias con `npx expo install`** cuando el paquete lo soporte, para que las versiones sean las compatibles con el SDK.
- **Prettier no formatea los `.md`** (`.prettierignore`): se editan a mano y solo a pedido.

### Backend (v2)

- **NestJS + PostgreSQL** (Postgres en Docker para desarrollo).
- Estructura por módulos de entidad.
- **Pendiente:** ORM del servidor (Drizzle, Prisma o TypeORM) y librería de validación de DTOs. Se decide al arrancar el backend.

---

## 5. Stack y dependencias

**Regla:** no se instala ninguna dependencia sin consultarlo antes, explicando qué problema resuelve, por qué no alcanza con lo que ya hay y qué alternativa se consideró.

| Dependencia | Para qué | Fase | Estado |
|---|---|---|---|
| Expo, Expo Router, TypeScript | Base del proyecto | 1 | Aprobada |
| Jest (preset `jest-expo`), React Native Testing Library | Tests | 1 | Aprobada |
| ESLint, Prettier | Calidad de código | 1 | Aprobada |
| `StyleSheet` nativo + tema propio | Estilos, sin librería | 1 | Aprobada |
| `expo-font` | Tipografía Atkinson Hyperlegible Next, incluida como archivo | 1 | Viene con Expo |
| `expo-splash-screen` | Mantener la pantalla de carga hasta que la fuente esté lista | 1 | Aprobada |
| `expo-system-ui` | Fondo nativo según el tema; necesaria para `userInterfaceStyle: "automatic"` en Android | 1 | Aprobada |
| `expo-haptics` | Vibración al marcar | 1 | Aprobada |
| `react-native-svg`, `lucide-react-native` | Íconos | 1 | Aprobada |
| `eslint-config-prettier` | Apaga las reglas de ESLint que chocan con Prettier | 1 | Aprobada |
| `react-native-reanimated` | Animaciones en el hilo nativo (llenado y trazo del check) | 1 | Viene con Expo, aprobada |
| `react-native-worklets` | Requerida por Reanimated 4 | 1 | Aprobada |
| `expo-sqlite`, `drizzle-orm` | Base local | 2 | A confirmar |
| `react-hook-form`, `zod` | Formularios y validación | 2 | A confirmar |
| Lista arrastrable | Ordenar ítems | 2 | A evaluar |
| Panel inferior | Sheets con gesto (librería o propio con Reanimated) | 3 | A evaluar |
| `react-native-gesture-handler` | Gestos del panel inferior | 3 | A evaluar |
| `expo-image-picker` | Foto opcional | 4 | A confirmar |
| `expo-image` | Mostrar las fotos (miniaturas, comprobante, foto ampliada) | 4 | A evaluar |
| `expo-notifications` | Avisos | 5 | A confirmar |

**SDK de Expo:** 58, compatible con Expo Go 58.0.5 de la App Store (confirmado en el iPhone el 2 de noviembre de 2026). Antes de actualizar el SDK, verificar que la App Store ya tenga el Expo Go correspondiente.

---

## 6. Estructura de los repos

### `app-mobile`

```
app-mobile/
├── src/
│   ├── app/                 rutas de Expo Router (pantallas delgadas)
│   │   ├── (tabs)/          index, items, reminders, settings
│   │   ├── lists/           [id], [id]/order, [id]/edit, new
│   │   ├── items/           [id], [id]/edit, new
│   │   ├── reminders/       [id], new
│   │   └── onboarding.tsx
│   ├── features/            lógica por entidad: items, lists, checks, reminders (y sync, auth en v2)
│   │                        cada una con components/, hooks/, *.repository.ts, *.schema.ts, *.types.ts
│   ├── components/ui/       design system: Button, Sheet, TextField, Toast…
│   ├── theme/               tokens: colors, typography, spacing, radius, motion
│   ├── db/                  cliente SQLite, schema Drizzle, migraciones
│   ├── i18n/es.ts           todos los textos
│   └── lib/                 utilidades transversales (fechas, vibración)
├── test/                    replica src/: unit/, components/, fixtures/, helpers/
└── docs/                    decisiones.md, design/
```

### `api` (v2)

```
api/
├── src/
│   ├── modules/             un módulo por entidad (items, lists, checks, users, sync)
│   ├── common/              guards, filtros, pipes, decoradores
│   ├── config/
│   └── database/            conexión, migraciones, seeds
├── test/                    unit/, e2e/, factories/, helpers/
└── docker-compose.yml
```

---

## 7. Testing

- **Principio:** testear donde un error duele y donde la lógica no es obvia. Sin tests de relleno ni objetivos de cobertura.
- **Prioridad máxima:** la lógica de vencimientos (`features/checks/expiration.ts`), con casos de borde de horario.
- **Frontend:** Jest + React Native Testing Library. Lógica de dominio, schemas de Zod, repositorios, hooks con lógica y componentes clave (`CheckRow`, panel de validez, formularios). No se testean estilos ni snapshots masivos.
- **Backend:** Jest + Supertest. Unitarios de servicios con repositorios simulados y end-to-end contra Postgres de prueba en Docker.
- **Tests en `test/`**, replicando la estructura de `src/`, nunca junto al archivo.
- **Una fase no está terminada sin sus tests pasando.**
- E2E del lado mobile: se evalúa en la fase 6.

---

## 8. Forma de trabajo

- **Regla principal:** antes de cualquier acción (crear o modificar archivos, instalar dependencias, commitear, pushear, abrir PRs), se consulta y se espera el ok explícito.
- **Ramas:** solo `feature/` y `fix/`, nombre en inglés: `feature/phase-1-base`, `fix/check-animation`. `main` siempre funciona.
- **Commits:** en español y simples («Diseño base, primeros componentes», «Fix de alerta de vencimiento»). Se proponen y se confirman antes de hacerlos.
- **Pull requests:** uno por fase o tarea, aunque se trabaje solo.
- **CI:** GitHub Action en cada PR con linter, chequeo de tipos y tests.
- **Repos:** privados en GitHub, creados por el dueño del proyecto; Claude Code opera sobre ellos con su confirmación.
- **Decisiones:** se discuten en el chat de decisiones y se registran en este archivo. Si en el código aparece una decisión que afecta a otras partes, se frena y se consulta.

---

## 9. Fases

Cada fase termina con algo que se puede probar en el teléfono.

| Fase | Qué se construye | Qué se prueba |
|---|---|---|
| 1. Base | Repo, Expo + TypeScript estricto, linter, estructura, tokens, fuente, tema claro y oscuro, `CheckRow`, detalle de lista con datos en memoria | Marcar y desmarcar con vibración (no persiste) |
| 2. Persistencia | SQLite + Drizzle, Inicio, Ítems, crear y editar ítem y lista, ordenar | Listas reales que sobreviven al cerrar la app |
| 3. Vencimientos | Lógica de validez con tests, panel de validez, comprobante, deshacer | El corazón de la app completo |
| 4. Evidencia | Foto opcional, detalle de ítem, historial y su limpieza | Ver cuándo y cómo se verificó cada cosa |
| 5. Avisos | Notificaciones locales y su reprogramación, Avisos, Ajustes | Que la app avise |
| 6. Pulido | Bienvenida, plantillas, todos los estados, accesibilidad, build Android | La app como la ve alguien nuevo |
| 7. Publicación | Ficha de Google Play, política de privacidad, prueba cerrada | Testers usándola |

Línea paralela opcional: base de `api` (NestJS, Postgres en Docker, endpoint de salud, CI) cuando se quiera.

---

## 10. Pruebas y publicación

- **Desarrollo en PC Windows.** Pruebas con Expo Go en iPhone (fases 1 a 3), emulador de Android Studio y, desde las fases 4 y 5, un Android físico.
- **Producción:** primero Google Play (US$25 único). App Store (US$99 por año) después.
- **Google Play exige una prueba cerrada con 12 testers durante 14 días** para cuentas nuevas. Juntar testers con tiempo.
- **Privacidad:** todo vive en el teléfono en la v1. Política de privacidad en lenguaje claro (requisito de la tienda), por ejemplo en GitHub Pages.

---

## 11. Pendientes

- [ ] Confirmar retención de historial de 90 días (antes de la fase 4).
- [ ] Confirmar cada dependencia «a confirmar» en su fase.
- [ ] Elegir librería de lista arrastrable y de panel inferior (fases 2 y 3).
- [ ] Elegir ORM y validación del backend (al arrancar `api`).
- [ ] Revisar la opción A del check compartido con feedback de testers.
- [ ] Verificar que no exista otra app llamada «Tilde» en las tiendas antes de publicar.
- [ ] Fase 2: implementar el toast con «Deshacer» al desmarcar (D-03). En la fase 1 se desmarca directo porque los datos no se guardan.
- [ ] Fase 2: reemplazar la redirección provisoria de `index.tsx` por las pestañas y mostrar los tres puntos del encabezado con su menú.
- [ ] Fase 2: definir los tokens del toast (fondo invertido, texto y acción), que están en los mockups pero no en la página de Color de la especificación.
