import type { Metadata } from "next";
import Link from "next/link";
import { Creative, InstagramFeed, ProductCarousel, ProductImage, Profile } from "./mockups";
import { products } from "./products";
import styles from "./page.module.css";

const title = "Freedom + Ads para Camsmark Panamá | Código Fresco";
const description = "Ricardo, así se verá tu catálogo convertido en publicaciones y campañas. Una demo ilustrativa de Freedom + Ads para Camsmark Panamá.";
const url = "https://codigofresco.com/demo/camsmark";

export const metadata: Metadata = {
  title: { absolute: title },
  applicationName: "Código Fresco",
  description,
  keywords: ["Camsmark Panamá", "Freedom + Ads", "Código Fresco"],
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: "Código Fresco", locale: "es_PA", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

const metrics = [
  { value: "24", label: "Publicaciones", detail: "Instagram + Facebook" },
  { value: "18.400", label: "Personas alcanzadas", detail: "Alcance ilustrativo" },
  { value: "620", label: "Clics al catálogo", detail: "Interés en tus productos" },
  { value: "18", label: "Conversiones", detail: "Consultas registradas" },
  { value: "USD 150", label: "Inversión publicitaria", detail: "Presupuesto de ejemplo" },
];

function SectionTitle({ number, label, title, description }: { number: string; label: string; title: string; description: string }) {
  return <div className={styles.sectionHeading}><p className={styles.eyebrow}><span>{number}</span> {label}</p><h2>{title}</h2><p>{description}</p></div>;
}

export default function CamsmarkDemoPage() {
  const siren = products[0];
  const insulator = products[1];

  return (
    <div className={styles.demo}>
      <a className={styles.skipLink} href="#contenido">Ir al contenido</a>
      <header className={styles.header}>
        <Link href="/" className={styles.wordmark} aria-label="Código Fresco, inicio"><span aria-hidden="true">[cƒ]</span> código fresco<span className={styles.wordmarkDot}>.</span></Link>
        <span className={styles.headerLabel}>PREPARADO PARA <b>CAMSMARK LATAM</b></span>
        <a href="#instagram" className={styles.headerCta}>Ver ejemplos <span aria-hidden="true">↓</span></a>
      </header>

      <main id="contenido">
        <section className={styles.hero} aria-labelledby="demo-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.liveDot} /> TU CATÁLOGO. MUCHO MÁS LEJOS.</p>
            <h1 id="demo-title">Así se verá <span>Freedom + Ads</span> en Camsmark Panamá<span className={styles.lime}>.</span></h1>
            <p className={styles.heroDescription}>Tu catálogo se convierte en publicaciones automáticas para Instagram y Facebook, acompañado de campañas para atraer clientes.</p>
            <div className={styles.personalNote}><span aria-hidden="true">↳</span><p><strong>Ricardo, esta demo es para ti.</strong><br />Mira cómo tus productos aparecerán en publicaciones, historias, carruseles y anuncios.</p></div>
            <a href="#formatos" className={styles.primaryButton}>Explorar la demo <span aria-hidden="true">↓</span></a>
            <p className={styles.disclaimer}>Demo ilustrativa — publicaciones y métricas de ejemplo</p>
            <div className={styles.heroFacts}><div><strong>06</strong><span>productos reales</span></div><div><strong>03</strong><span>formatos de contenido</span></div><div><strong>01</strong><span>sistema conectado</span></div></div>
          </div>
          <InstagramFeed />
        </section>

        <div className={styles.channelStrip}><span>DEL CATÁLOGO A TUS CLIENTES</span><p>Instagram <i>✳</i> Facebook <i>✳</i> Meta Ads <i>✳</i> Google Ads</p><span>FREEDOM + ADS</span></div>

        <section id="formatos" className={styles.section} aria-labelledby="formats-title">
          <SectionTitle number="01" label="PRESENCIA CONSTANTE" title="Un catálogo. Más formas de conectar." description="Freedom transforma la información de tus productos en contenido con foto, precio, beneficio y un siguiente paso claro." />
          <div className={styles.formatGrid}>
            <div><div className={styles.formatLabel}><h3 id="formats-title">Publicación de Facebook</h3><span>01 / FEED</span></div>
              <article className={styles.facebookCard} aria-label="Publicación simulada de Facebook">
                <Profile detail="Publicación de ejemplo · Público" />
                <div className={styles.facebookCopy}><p><strong>{insulator.name} · USD {insulator.price}</strong></p><p>{insulator.benefit}</p><a href={insulator.url} target="_blank" rel="noopener noreferrer">Consulta la ficha y equipa tu proyecto ↗</a><p className={styles.hashtags}>{insulator.hashtags}</p></div>
                <Creative product={insulator} />
                <div className={styles.facebookFooter} aria-hidden="true"><span>♡ Me gusta</span><span>Comentar</span><span>Compartir</span></div>
              </article>
            </div>
            <div className={styles.storyColumn}><div className={styles.formatLabel}><h3>Historia de Instagram</h3><span>02 / HISTORIA</span></div>
              <article className={styles.story} aria-label="Historia simulada de Instagram con producto etiquetado">
                <div className={styles.storyProgress} aria-hidden="true"><span /><span /><span /></div>
                <Profile detail="Historia de ejemplo" />
                <p className={styles.storyEyebrow}>ELÉCTRICO E INDUSTRIAL</p><h4>Que tu próximo<br />proyecto se haga<br /><em>escuchar.</em></h4>
                <ProductImage product={siren} />
                <a className={styles.productTag} href={siren.url} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">⌑</span><span><strong>{siren.name}</strong><small>USD {siren.price} · Ver producto ↗</small></span></a>
                <p className={styles.storyFootnote}>Etiqueta ilustrativa · Sujeta a habilitación del catálogo en Meta.</p>
              </article>
            </div>
          </div>
          <div className={styles.carouselSection}>
            <div className={styles.carouselExplanation}><p className={styles.eyebrow}>03 / CARRUSEL DE INSTAGRAM</p><h3>Un carrusel.<br /><span>Seis productos para explorar.</span></h3><p>Cada lámina muestra un producto, su precio y sus características. Ricardo, prueba cómo tus clientes podrán recorrer el catálogo.</p><ul><li><strong>Primero, descubre:</strong> la foto y el precio llaman la atención.</li><li><strong>Después, compara:</strong> cada lámina presenta otra opción del catálogo.</li><li><strong>Finalmente, consulta:</strong> el llamado a la acción dirige a tu tienda.</li></ul><small>Prueba las flechas o desliza sobre la imagen en el móvil. Es un ejemplo de formato, no una publicación real.</small></div>
            <ProductCarousel />
          </div>
        </section>

        <section id="anuncios" className={`${styles.section} ${styles.adsSection}`}>
          <SectionTitle number="02" label="PUBLICIDAD CON DIRECCIÓN" title="Tus productos, frente a nuevos clientes." description="Una muestra de cómo se verían las campañas: en las redes que recorren y en las búsquedas que ya hacen." />
          <div className={styles.adsGrid}>
            <div><div className={styles.formatLabel}><h3>Meta Ads</h3><span>ANUNCIO DE EJEMPLO</span></div>
              <article className={styles.metaAd}><Profile detail="Publicidad · Ejemplo" /><p className={styles.adCopy}>Dale voz a tu instalación. Conoce la sirena TCZ-220 de 110 V y consulta sus especificaciones en Camsmark.</p><Creative product={siren} /><div className={styles.adDestination}><div><small>CAMSMARK.COM</small><strong>Sirena TCZ-220 · USD {siren.price}</strong></div><a href={siren.url} target="_blank" rel="noopener noreferrer">Ver producto ↗</a></div></article>
            </div>
            <div className={styles.searchColumn}><div className={styles.formatLabel}><h3>Google Ads</h3><span>BÚSQUEDA DE EJEMPLO</span></div>
              <article className={styles.searchAd} aria-label="Anuncio simulado de Google Ads"><div className={styles.searchBar}><span aria-hidden="true">⌕</span> aislador 24 kv panamá <span aria-hidden="true">⌕</span></div><p className={styles.sponsored}>Patrocinado · Ejemplo</p><div className={styles.searchBrand}><span aria-hidden="true">c</span><div><strong>Camsmark</strong><small>camsmark.com › pa › producto</small></div></div><a href={insulator.url} target="_blank" rel="noopener noreferrer" className={styles.searchTitle}>Aislador EL-24 de 24 kV | Camsmark Panamá</a><p>Aislador EL-24, altura de 210 mm. <b>USD {insulator.price}.</b> Consulta especificaciones y disponibilidad en nuestro catálogo.</p><div className={styles.searchLinks}><a href={insulator.url} target="_blank" rel="noopener noreferrer">Ver especificaciones</a><a href="https://camsmark.com/pa/catalogo" target="_blank" rel="noopener noreferrer">Explorar catálogo</a></div></article>
              <div className={styles.strategyNote}><span aria-hidden="true">↗</span><div><h4>Publicar te da presencia.<br />La pauta amplía tu alcance.</h4><p>Las campañas llevan al producto correcto. Medimos clics y consultas para ajustar mensajes, públicos y presupuesto.</p><small>Creatividades ilustrativas; no hay campañas activas en esta demo.</small></div></div>
            </div>
          </div>
          <div className={styles.exposure}>
            <h3>Así gana exposición tu catálogo</h3>
            <p>Estar presente cuando recorren sus redes y cuando buscan una solución concreta son oportunidades distintas que se complementan.</p>
            <div className={styles.exposureGrid}>
              <article><span>01 / REDES SOCIALES</span><h4>«No lo buscaba.<br />Ahora lo conozco».</h4><p>Las publicaciones, historias y carruseles muestran tus productos a las personas que visitan tu perfil o reciben tu contenido.</p><strong>Para qué: mantener tu marca presente y dar a conocer el catálogo.</strong></article>
              <article><span>02 / META ADS</span><h4>«Esta solución<br />puede servirme».</h4><p>La pauta permite buscar exposición más allá de tus seguidores, con públicos y ubicaciones definidos para la campaña.</p><strong>Para qué: llegar a potenciales clientes que todavía no te conocen.</strong></article>
              <article><span>03 / BÚSQUEDA DE GOOGLE</span><h4>«Necesito un<br />aislador de 24 kV».</h4><p>Un anuncio puede aparecer ante búsquedas relacionadas con tus productos y llevar directamente a su ficha en la tienda.</p><strong>Para qué: conectar con personas que ya expresan una necesidad.</strong></article>
            </div>
            <p className={styles.exposureFootnote}>Publicar en Instagram no posiciona automáticamente tu tienda en Google. Los anuncios de búsqueda usan un presupuesto de pauta aparte; el posicionamiento orgánico (SEO) es otro trabajo. La exposición depende del contenido, la audiencia, la competencia y el presupuesto, y no garantiza ventas.</p>
          </div>
        </section>

        <section id="reporte" className={styles.section}>
          <SectionTitle number="03" label="CLARIDAD CADA MES" title="Lo que pasa, en números claros." description="Un reporte para ver qué se publicó, cuántas personas llegaron y qué acciones generó la campaña." />
          <div className={styles.report}><div className={styles.reportHeader}><div><span className={styles.liveDot} /><strong>Camsmark Panamá</strong><span> / Resumen mensual</span></div><span className={styles.exampleBadge}>DATOS DE EJEMPLO</span></div><div className={styles.metrics}>{metrics.map(metric => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}</small></div>)}</div><p>Período ilustrativo de 30 días. Cifras ficticias, no resultados reales ni una promesa de rendimiento. El reporte permite revisar qué contenidos generan visitas y consultas.</p></div>
        </section>

        <section className={styles.section}>
          <SectionTitle number="04" label="MENOS TRABAJO MANUAL" title="De tu catálogo a tus redes, en tres pasos." description="Tú mantienes la información de tus productos. Freedom ayuda a que más personas los descubran." />
          <ol className={styles.steps}><li><span>01 <i aria-hidden="true">↗</i></span><h3>Conectamos tu catálogo</h3><p>Tomamos fotos, nombres, precios y enlaces de tu tienda como base del contenido.</p></li><li><span>02 <i aria-hidden="true">↗</i></span><h3>Freedom publica</h3><p>Preparamos el formato y la programación para mantener activos Instagram y Facebook.</p></li><li><span>03 <i aria-hidden="true">↗</i></span><h3>Optimizamos las campañas</h3><p>Revisamos resultados y ajustamos los anuncios para orientar mejor la inversión.</p></li></ol>
        </section>

        <div className={styles.sources}><a href="/demo/camsmark/propuesta.pdf" target="_blank" rel="noopener noreferrer" className={styles.headerCta}>Abrir la propuesta en PDF ↗</a></div>
        <details className={styles.sources}><summary>Sobre esta demo y sus productos</summary><p>Productos y precios del catálogo de Panamá, consultados el 20 de noviembre de 2026. Los precios y la disponibilidad pueden cambiar. Las fotografías cargan desde sus URL originales en camsmark.com; si una imagen no está disponible, aparece un marcador. Los textos de las publicaciones son ejemplos preparados para Camsmark Panamá.</p><ul>{products.map(product => <li key={product.id}><a href={product.url} target="_blank" rel="noopener noreferrer">{product.sourceName} — USD {product.price} ↗</a></li>)}</ul><p>Esta página simula publicaciones, etiquetas y anuncios. No publica en redes ni activa campañas.</p></details>
      </main>
      <footer className={styles.footer}><span className={styles.wordmark}>código fresco<span className={styles.wordmarkDot}>.</span></span><p>Preparado para Ricardo · Camsmark Panamá</p><small>Demo ilustrativa — publicaciones y métricas de ejemplo</small></footer>
    </div>
  );
}
