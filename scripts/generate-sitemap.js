import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

const generateSitemap = async () => {
  const smStream = new SitemapStream({
    hostname: 'https://www.blanqueriamarcablanca.com',
  })

  // Añade tus rutas manualmente o de una base de datos
  const routes = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/contacto', changefreq: 'monthly', priority: 0.8 },
    { url: '/ventajas', changefreq: 'monthly', priority: 0.6 },
    { url: '/suscripciones', changefreq: 'monthly', priority: 0.4 },
    { url: '/login', changefreq: 'monthly', priority: 0.2 },
    { url: '/terminos-y-condiciones', changefreq: 'monthly', priority: 0.1 },
    // Agrega más rutas aquí
  ]

  routes.forEach((route) => smStream.write(route))

  smStream.end()

  // Generar y guardar el archivo
  const sitemap = await streamToPromise(smStream)
  createWriteStream('./public/sitemap.xml').write(sitemap)
}

generateSitemap().catch(console.error)
