import type { Config } from "@react-router/dev/config";

export default {
  prerender: ["/", "/contacto", "/catalogo", "/ventajas", "/suscripciones", "/terminos-y-condiciones"], // Rutas estáticas para prerenderizar
} satisfies Config;
