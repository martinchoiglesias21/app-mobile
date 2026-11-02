// Every interface text, in Rioplatense Spanish. Texts with values are
// functions so word order lives here, not in the components. Times and days
// arrive already formatted (see src/lib/dates.ts).
export const es = {
  checkRow: {
    pending: 'Pendiente',
    /** «Verificado a las 21:43» */
    verifiedAt: (time: string) => `Verificado a las ${time}`,
    /** «hasta 06:00» */
    until: (time: string) => `hasta ${time}`,
    /** «hasta vie 08:30», when it ends another day. */
    untilDay: (day: string, time: string) => `hasta ${day} ${time}`,
    noExpiry: 'sin vencimiento',
    /** «Venció hoy 13:00», only during that day. */
    expiredToday: (time: string) => `Venció hoy ${time}`,
    a11y: {
      /** «el viernes a las 8 y 30»: the end, spoken, when it is 24 h or more away. */
      untilDay: (weekday: string, time: string) => `el ${weekday} a ${time}`,
      /** «Llave del gas, verificado a las 21:43, vale hasta las 6.» `until` is spoken: «las 6». */
      verified: (name: string, time: string, until: string) =>
        `${name}, verificado a las ${time}, vale hasta ${until}.`,
      /** «Alarma puesta, verificado a las 22:30, sin vencimiento.» */
      verifiedNoExpiry: (name: string, time: string) =>
        `${name}, verificado a las ${time}, sin vencimiento.`,
      /** «Luces apagadas, pendiente.» */
      pending: (name: string) => `${name}, pendiente.`,
      /** «Plancha desenchufada, pendiente, venció hoy a las 13.» `time` is spoken. */
      expiredToday: (name: string, time: string) => `${name}, pendiente, venció hoy a ${time}.`,
      /** «Ver detalle de Llave del gas» */
      openDetail: (name: string) => `Ver detalle de ${name}`,
    },
  },
  /** Times as the screen reader says them. Special words only on the exact hour. */
  spokenTime: {
    midnight: 'medianoche',
    noon: 'mediodía',
    /** «la 1», «las 6», «las 13», «las 0» */
    hour: (hour: number) => (hour === 1 ? 'la 1' : `las ${hour}`),
    /** «las 6 y 30», «la 1 y 5» */
    hourAndMinutes: (hour: number, minutes: number) =>
      `${hour === 1 ? 'la 1' : `las ${hour}`} y ${minutes}`,
  },
  listDetail: {
    /** «2 de 4 verificados» */
    progress: (verified: number, total: number) => `${verified} de ${total} verificados`,
    /** «Todo verificado, último a las 21:52» */
    allVerified: (time: string) => `Todo verificado, último a las ${time}`,
    addItem: 'Agregar ítem',
    empty: {
      title: 'Esta lista no tiene ítems',
      body: 'Sumá lo que querés verificar antes de salir.',
    },
  },
  screenHeader: {
    back: 'Inicio',
  },
  button: {
    saving: 'Guardando…',
  },
  errors: {
    saveFailed: 'No se pudo guardar.',
    retry: 'Reintentar',
  },
} as const;

export type Strings = typeof es;
