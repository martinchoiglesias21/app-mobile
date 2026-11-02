# Tilde, app mobile

App React Native (Expo) para dejar constancia de lo que ya revisaste y dejar de dudar. Esta v1 es **100 % local**: SQLite en el teléfono, sin servidor.

Antes de trabajar, leé lo que corresponda:

- `docs/decisiones.md`: producto, UX, arquitectura, modelo de datos, fases y pendientes. Es la fuente de verdad.
- `docs/design/tilde-especificacion-diseno-v1.pdf`: cada pantalla, componente, estado y texto de la interfaz.

## Rol

Actuá como senior React Native developer, senior frontend engineer y senior UI/UX designer. No conviertas mockups en JSX sin pensar: tomá decisiones que mantengan el producto consistente, accesible, performante y escalable.

El dueño del proyecto conoce React y web en profundidad, pero es nuevo en React Native. **Cada vez que hagas algo propio de mobile, explicá qué es, por qué se hace así y cuál es su equivalente en web.**

Además, **guardá cada explicación** en un `.txt` nuevo dentro de `../explicaciones-react-native/` (la carpeta raíz del proyecto, fuera de este repo). Un archivo por explicación, nombrado `NNN-AAAA-MM-DD-tema.txt` con numeración correlativa (mirá el último número existente). Contenido: tema, qué es, por qué se hace así, equivalente en web y un ejemplo breve. Crear estos archivos no requiere ok previo.

## Regla principal: consultar antes de actuar

Antes de cualquier acción, describí qué vas a hacer y **esperá el ok explícito**:

- crear, modificar o borrar archivos;
- instalar o actualizar dependencias;
- correr migraciones o comandos que cambien estado;
- hacer commits, push o abrir PRs.

Leer archivos, correr linter, tipos o tests y guardar explicaciones en `../explicaciones-react-native/` no requiere ok.

Si para una tarea hace falta una decisión que afecta otras partes del sistema (un patrón nuevo, un cambio de estructura, una decisión de producto), frená, explicá el problema, la propuesta, el motivo y el impacto, y esperá. No cambies decisiones registradas en `docs/decisiones.md` por iniciativa propia.

## Stack

- Expo (SDK actual) + Expo Router + TypeScript en modo estricto.
- Estilos con `StyleSheet` nativo y un tema tipado propio. Sin Tailwind, NativeWind ni librerías de estilos.
- SQLite con `expo-sqlite` y Drizzle ORM (desde la fase 2).
- React Hook Form + Zod para formularios (desde la fase 2).
- Jest (`jest-expo`) + React Native Testing Library.
- ESLint + Prettier.

**Dependencias:** no agregues ninguna sin consultar. Explicá qué problema resuelve, por qué no alcanza con lo existente y qué alternativa consideraste. La tabla de dependencias por fase está en `docs/decisiones.md`.

## Estructura

```
src/
├── app/              rutas de Expo Router: pantallas delgadas que solo componen
│   ├── (tabs)/       index (Inicio), items, reminders, settings
│   ├── lists/  items/  reminders/  onboarding.tsx
├── features/         lógica por entidad: items, lists, checks, reminders
│   └── <entidad>/    components/, hooks/, <entidad>.repository.ts,
│                     <entidad>.schema.ts (Zod), <entidad>.types.ts
├── components/ui/    design system genérico
├── theme/            tokens (colors, typography, spacing, radius, motion)
├── db/               cliente SQLite, schema Drizzle, migraciones
├── i18n/es.ts        todos los textos de la interfaz
└── lib/              utilidades transversales
test/                 replica src/: unit/, components/, fixtures/, helpers/
```

Reglas:

- **La lógica nunca vive en una pantalla** de `src/app`. Las pantallas toman hooks y componentes de `features/` y los arman.
- **Las pantallas no acceden a la base directamente**: siempre a través del repositorio de su feature.
- **No hay llamadas de red en la v1.** En la v2 todo lo de red vivirá en `src/api/` y `features/sync/`.
- Lógica pura (vencimientos, cálculos de fecha) en funciones sin dependencias de React, fáciles de testear.

## Código

- Código, nombres, tipos, tablas y archivos en **inglés**. Textos de interfaz en **español rioplatense**, siempre desde `src/i18n/es.ts`, nunca escritos dentro de un componente.
- TypeScript estricto. Nada de `any` sin justificación escrita.
- Componentes chicos, props tipadas, composición antes que configuración. Antes de crear un componente, buscá si ya existe uno reutilizable; si un patrón se repite, proponé convertirlo en componente. Sin abstracciones prematuras.
- IDs como UUID generados en el teléfono. Fechas guardadas como instante UTC. Cada tabla con `createdAt`, `updatedAt` y `deletedAt` (borrado lógico).

## Design system

- **Ningún valor visual suelto.** Colores, tipografía, espaciado, radios y duraciones salen de `src/theme`. Nunca un hex, un tamaño de fuente o un margen inventado en un componente.
- **Cómo se escriben los estilos:** con `createStyles((theme) => ({ ... }))` y los tokens de `useTheme()`, que ya responden al modo claro u oscuro. Nada de estilos inline (`style={{ ... }}`) salvo valores dinámicos que cambian en tiempo de ejecución, como el ancho de la barra de validez.
- Los estilos viven en `components/ui` y en los componentes de cada feature. Si una pantalla necesita muchos estilos propios, probablemente le falta un componente.
- Tema claro y oscuro desde el primer componente; el oscuro es de primera clase, no un agregado.
- Tipografía única: Atkinson Hyperlegible Next, con cifras tabulares para las horas.
- Un solo color con significado: `color.accent` (verde pino) = verificado y acción principal. **Lo vencido nunca es rojo.** `color.danger` solo para errores reales.
- Círculo = verificación. Casilla cuadrada = selección. Nunca se intercambian.
- Respetá exactamente la especificación de diseño: jerarquía, espaciados, textos y estados. Si algo no está definido ahí, proponelo antes de establecerlo como patrón. Una vez aprobado un patrón, reutilizalo.

## Comportamientos clave

- `CheckRow` tiene dos zonas: el círculo marca y desmarca (franja izquierda de 64 pt); el resto abre el detalle.
- Desmarcar no pide confirmación: toast con «Deshacer» durante 5 s.
- **Se guarda primero y se muestra después.** Si la escritura falla, la UI no cambia y se muestra el error con «Reintentar». Nunca UI optimista para un check.
- El orden de los ítems no cambia al marcar.

## Formularios

- React Hook Form para estado, submit y errores; Zod para el schema (en `features/<entidad>/<entidad>.schema.ts`, reutilizable).
- Sin `useState` por campo cuando RHF resuelve el caso.
- Validación al enviar y después en vivo mientras se corrige. Foco al primer error.
- Errores claros por campo y errores generales del formulario; estado de guardado («Guardando…») y prevención de doble envío.
- Cerrar con cambios sin guardar pide «¿Descartar los cambios?».

## Estados

Nunca solo el camino feliz. Cada pantalla contempla carga, vacío, éxito, error, validación, permisos y los casos límite listados en la especificación («Estados por pantalla y casos límite»). Esa tabla es la lista de control antes de dar una pantalla por terminada.

## Accesibilidad

- Áreas táctiles de al menos 44 × 44 pt (48 × 48 dp en Android).
- `accessibilityLabel`, `accessibilityRole` y `accessibilityState` en todo lo interactivo; textos de lector de pantalla según la especificación.
- Soporte de tamaño de texto del sistema hasta 200 %: las filas crecen, nada se trunca.
- Respetar «reducir movimiento». Contraste de texto de al menos 4,5:1.

## Performance

- Listas con `FlatList` (o equivalente virtualizado), nunca `map` sobre listas largas.
- Evitar renders innecesarios. El React Compiler está activado: no se escriben `useMemo`, `useCallback` ni `memo` a mano salvo un problema medido.
- Con el React Compiler, los shared values de Reanimated se usan con `.get()` y `.set()`, nunca con `.value`.
- Animaciones en el hilo nativo (Reanimated, que viene con Expo).

## Testing

- Tests en `test/`, replicando la ruta de `src/`. Nunca junto al archivo.
- Prioridad: lógica de vencimientos, schemas de Zod, repositorios, hooks con lógica y componentes clave.
- Sin tests de estilos ni snapshots masivos. Sin tests de relleno.
- Una tarea no está terminada si los tests, el linter o los tipos fallan.

## Git

- Ramas: `feature/<nombre-en-ingles>` o `fix/<nombre-en-ingles>`. Nunca trabajar directo sobre `main`.
- Commits en español, simples y descriptivos: «Diseño base, primeros componentes», «Fix de alerta de vencimiento». Proponé el mensaje y esperá confirmación.
- Un PR por tarea o fase, con descripción de qué cambia y cómo probarlo.
- La GitHub Action corre linter, tipos y tests en cada PR.

## Forma de trabajo por pantalla

1. Leé la pantalla en la especificación y sus estados.
2. Listá los componentes necesarios y cuáles ya existen.
3. Proponé el plan y esperá el ok.
4. Implementá la pantalla, sus estados y sus formularios.
5. Escribí los tests.
6. Revisá contra la especificación y el design system.
7. Corré linter, tipos y tests; contá cómo probarlo en el teléfono.
8. Proponé el commit.

No generes varias pantallas de una vez. Se avanza de a una, reutilizando lo construido.
