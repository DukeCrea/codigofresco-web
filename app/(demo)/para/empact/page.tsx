import type { Metadata } from "next";
import { PortfolioHeader } from "../../../components/portfolio/chrome";
import { channels, creatives, money, processes, totalSpend } from "./data";
import styles from "./page.module.css";

const title = "Antonio Duque × Empact | Paid Media y el sistema que lo sostiene";
const description = "Creatividad, medición y CRM. Un caso real de automoción en Panamá, cifras contrastadas y una propuesta para empezar en Empact.";
const url = "https://codigofresco.com/para/empact";
export const metadata: Metadata = {
  title: { absolute: title }, description,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: url },
  openGraph: { title, description, url, locale: "es_ES", siteName: "Código Fresco", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function EmpactPage() {
  return (
    <div className={styles.page}>
      <PortfolioHeader lang="es" alternateHref={null} />
      <main id="contenido">
        <section className={styles.hero} aria-labelledby="titulo">
          <div>
            <p className={styles.eyebrow}><span className={styles.dot} /> PARA JAVI Y XAVI · NOVIEMBRE 2026</p>
            <h1 id="titulo">Paid Media.<br />Y el sistema<br /><em>que lo sostiene.</em></h1>
            <p className={styles.intro}>Conecto la creatividad, la medición y lo que pasa después del clic. Para que el equipo pueda decidir con datos fiables y repetir lo que funciona.</p>
            <p className={styles.personal}>Javi, después de nuestra conversación, aquí tenéis una forma concreta de conocer mi trabajo. Xavi, soy Antonio: este es un caso real y cómo propongo llevar esa experiencia a vuestro equipo.</p>
            <div className={styles.actions}><a className={styles.primary} href="#resultados">Ver los resultados <span aria-hidden="true">↓</span></a><a className={styles.textLink} href="#procesos">Cómo trabajo ↗</a></div>
          </div>
          <aside className={styles.caseCover} aria-label="Resumen del caso">
            <div className={styles.coverTop}><span>CASO 01 / AUTOMOCIÓN</span><span>PANAMÁ ↗</span></div>
            <p className={styles.coverTitle}>Del anuncio<br />a una conversación<br /><i>que se puede medir.</i></p>
            <div className={styles.coverNumber}>1.995<span>conversaciones de ≥3 mensajes</span></div>
            <div className={styles.coverBottom}><div><strong>1,66 <small>USD</small></strong><span>por conversación</span></div><div><strong>Meta → WhatsApp</strong><span>20 sep – 24 nov 2026</span></div></div>
            <p className={styles.coverNote}>Dato reportado por Meta, contrastado con la extracción diaria. No equivale a ventas ni a leads cualificados.</p>
          </aside>
        </section>

        <section className={styles.investment} aria-labelledby="inversion">
          <div><p className={styles.eyebrow}>EL CONTEXTO DE LA CUENTA</p><h2 id="inversion">{money(totalSpend)} <span>USD</span></h2><p>Inversión publicitaria registrada en el proyecto.<br />Ventana: 12 de marzo – 24 de noviembre de 2026.</p></div>
          <div className={styles.channelList}>{channels.map(channel => <div className={styles.channel} key={channel.name}><div><strong>{channel.name}</strong><span>{money(channel.spend)} USD</span></div><div className={styles.track}><span style={{ width: `${channel.spend / totalSpend * 100}%` }} /></div><small>Datos disponibles desde el {channel.since} · hasta el 24 nov</small></div>)}</div>
        </section>

        <section id="resultados" className={styles.section} aria-labelledby="resultados-titulo">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>01 / RESULTADOS CON CONTEXTO</p><h2 id="resultados-titulo">La pieza importa.<br /><em>Lo que medimos, también.</em></h2><p>Un concesionario de seminuevos que vende por WhatsApp. Cada resultado tiene su periodo, su inversión y una definición concreta.</p></div>
          <div className={styles.resultsGrid}>{creatives.map((creative, index) => <article className={styles.result} key={creative.name}><div className={styles.resultTop}><span>0{index + 1}</span><span>{creative.format}</span></div><h3>{creative.name}</h3><p className={styles.resultNumber}>{money(creative.spend / creative.results)} <span>USD</span></p><p className={styles.resultLabel}>por conversación ≥3 mensajes</p><dl><div><dt>Conversaciones</dt><dd>{creative.results.toLocaleString("es-ES")}</dd></div><div><dt>Inversión</dt><dd>{money(creative.spend)} USD</dd></div></dl><p className={styles.period}>{creative.since}</p></article>)}</div>
          <p className={styles.footnote}>Fuente: acciones de Meta almacenadas por anuncio y día. La imagen del Picanto es una pieza concreta de septiembre, no la media de la campaña. No se atribuye una mejora causal a un formato.</p>
          <div className={styles.campaign}><div><p className={styles.eyebrow}>LA CAMPAÑA COMPLETA</p><h3>Una pieza por coche.<br />Un criterio para renovar.</h3><p>La campaña de financiación por inventario permite comparar productos y sustituir las piezas con peor coste por conversación.</p></div><div className={styles.campaignFacts}><div><strong>3.315,43 <small>USD</small></strong><span>inversión</span></div><div><strong>3.521</strong><span>conversaciones iniciadas</span></div><div><strong>1.995</strong><span>conversaciones ≥3 mensajes</span></div></div><p className={styles.footnote}>20 sep – 24 nov 2026 · Selección por nombre de campaña. Las piezas publicadas antes en otra campaña quedan fuera de este total.</p></div>
        </section>

        <section className={`${styles.section} ${styles.signal}`} aria-labelledby="senal-titulo">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>02 / MI APORTACIÓN</p><h2 id="senal-titulo">Antes de escalar,<br /><em>compruebo la señal.</em></h2><p>Los resultados publicitarios y los comerciales viven en sitios distintos. Mi trabajo es conectarlos y detectar cuándo una cifra cuenta otra cosa.</p></div>
          <div className={styles.findings}>
            <article><span className={styles.label}>DEFINICIÓN DEL RESULTADO</span><h3>1.290 leads<br />≠ 1.290 formularios web</h3><p>Un vídeo de captación registró 1.290 leads agregados de Meta, incluidos 1.262 leads web reportados. Separar ambas métricas cambia la lectura del coste.</p><small>30 jun – 29 sep · 8.216,84 USD · 6,37 USD por lead agregado</small></article>
            <article><span className={styles.label}>CATÁLOGO Y MEDICIÓN</span><h3>9.203 de 9.206<br />referencias reconocidas</h3><p>La auditoría del catálogo verificó un 99,97 % de coincidencia en referencias de producto de ViewContent. Es una comprobación del catálogo, no una tasa de conversión.</p><small>12–18 nov · Meta event_stats · auditoría del 20 nov</small></article>
            <article><span className={styles.label}>LO QUE PASA DESPUÉS DEL CLIC</span><h3>El formulario termina<br />cuando llega al CRM.</h3><p>Una prueba controlada acreditó el guardado y la recepción en el CRM. La revisión también permitió reparar un error de JavaScript y la salida de JSON que veía el visitante.</p><small>Verificación y reparación documentadas · 19–20 nov</small></article>
          </div>
          <div className={styles.loop} aria-label="Flujo de trabajo: inventario, creatividad, WhatsApp, CRM y señales a plataformas">{["Inventario", "Creatividad", "WhatsApp", "CRM", "Señales a plataformas"].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong><small>{["Oferta disponible", "Una pieza por producto", "Conversación", "Resultado comercial", "Envío y revisión"][index]}</small>{index < 4 && <i aria-hidden="true">→</i>}</div>)}</div>
          <div className={styles.offline}><div><p className={styles.eyebrow}>CONVERSIONES OFFLINE · ENVÍOS REGISTRADOS</p><h3>El resultado comercial<br />también vuelve.</h3><p>La cola de conversiones registra envíos con respuesta correcta de la API para eventos de venta. El sistema utiliza Google Data Manager API y las integraciones de Meta y TikTok.</p></div><div className={styles.offlineNumbers}><div><strong>14</strong><span>Google</span></div><div><strong>5</strong><span>Meta</span></div><div><strong>11</strong><span>TikTok</span></div></div><p className={styles.footnote}>Ventas con fecha hasta el 24 nov; estado consultado el 25 nov. Los destinos pueden solaparse: no se suman como ventas únicas. El envío correcto no acredita atribución, deduplicación ni cobertura completa.</p></div>
        </section>

        <section id="procesos" className={styles.section} aria-labelledby="procesos-titulo">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>03 / CÓMO TRABAJO</p><h2 id="procesos-titulo">Seis procesos.<br /><em>Un método que se comparte.</em></h2><p>Podéis abrir cada proceso para ver sus entradas, pasos, herramientas y criterio de decisión. Las aplicaciones a Empact son propuestas.</p></div>
          <div className={styles.processes}>{processes.map((process, index) => <details key={process.title} className={styles.process}><summary><span className={styles.processIndex}>0{index + 1}</span><div><small>{process.label}</small><h3>{process.title}</h3><p>{process.summary}</p></div><span className={styles.plus} aria-hidden="true">+</span></summary><div className={styles.processBody}><div><h4>Problema que resuelve</h4><p>{process.problem}</p><h4>Entradas</h4><p>{process.inputs}</p><h4>Pasos</h4><ol>{process.steps.map(step => <li key={step}>{step}</li>)}</ol></div><div><h4>Herramientas</h4><p>{process.tools}</p><h4>Métrica que manda</h4><p>{process.metric}</p><h4>Cadencia</h4><p>{process.cadence}</p><h4>Resultado real en el concesionario</h4><p>{process.result}</p><div className={styles.proposal}><h4>Propuesta para Empact</h4><p>{process.proposal}</p></div></div></div></details>)}</div>
        </section>

        <section id="encaje" className={`${styles.section} ${styles.fit}`} aria-labelledby="encaje-titulo">
          <div className={styles.sectionHeading}><p className={styles.eyebrow}>04 / DÓNDE ENCAJO</p><h2 id="encaje-titulo">Una primera cuenta.<br /><em>Un problema concreto.</em></h2><p>Propongo empezar donde más os ayude: una cuenta nueva que necesita medición, un catálogo que pide ritmo creativo o un recorrido que pierde solicitudes.</p></div>
          <div className={styles.tableWrap}><table><caption>Dónde encajo en vuestro equipo</caption><thead><tr><th scope="col">Rol o tarea</th><th scope="col">Qué aporto</th><th scope="col">Procesos</th></tr></thead><tbody><tr><th scope="row">Medición y CRM</th><td>Definiciones fiables, auditoría y conexión con el resultado comercial.</td><td>01 + 04</td></tr><tr><th scope="row">Creatividad y producción</th><td>Plantillas y guiones con una rutina que el equipo pueda repetir.</td><td>02 + 03</td></tr><tr><th scope="row">Conversión y análisis</th><td>Revisión del recorrido y decisiones de inversión con contexto.</td><td>05 + 06</td></tr></tbody></table></div>
          <h3 className={styles.planTitle}>Primeros 30 días <span>PROPUESTA</span></h3>
          <div className={styles.plan}>{[
            ["SEMANA 1", "Entender y auditar", "Elegir la cuenta, acordar qué cuenta como lead y revisar medición, formularios y CRM.", "Entrega: diagnóstico y prioridades."],
            ["SEMANAS 2–3", "Corregir y producir", "Resolver las pérdidas prioritarias y preparar una primera tanda de piezas. Validar integraciones si la cuenta tiene los datos necesarios.", "Entrega: cambios comprobados y ciclo creativo."],
            ["SEMANA 4", "Evaluar y documentar", "Contrastar inversión y resultados disponibles. Decidir qué mantener o rehacer y dejar el método por escrito.", "Entrega: revisión y siguiente ciclo de trabajo."],
          ].map(([week, heading, text, delivery]) => <article key={week}><span className={styles.label}>{week}</span><h4>{heading}</h4><p>{text}</p><strong>{delivery}</strong></article>)}</div>
        </section>

        <section id="fuentes" className={`${styles.section} ${styles.method}`} aria-labelledby="fuentes-titulo"><p className={styles.eyebrow}>05 / CÓMO LEER LOS DATOS</p><h2 id="fuentes-titulo">Cifras con alcance claro.</h2><details><summary>Fuentes, definiciones y límites <span aria-hidden="true">+</span></summary><div><p><strong>Comprobación:</strong> consulta de solo lectura del 25 de noviembre de 2026 sobre la base operativa del proyecto y revisión de auditorías documentadas del 19–20 de noviembre. Los resultados publicitarios cierran el 24 de noviembre.</p><p><strong>Inversión:</strong> suma del gasto diario a nivel de campaña. No se suma el nivel de anuncio a ese total. Meta dispone de datos desde el 12 de marzo; Google desde el 1 de mayo y TikTok desde el 8 de mayo. Moneda: USD.</p><p><strong>Conversaciones:</strong> acción de Meta de al menos tres mensajes, leída de sus datos originales. Es una métrica de plataforma; no está presentada como contactos únicos contrastados en CRM, ventas ni leads cualificados.</p><p><strong>Creatividades:</strong> agrupación por el nombre de cada pieza. Los periodos aparecen junto a cada resultado. El total de la campaña por coche utiliza el nombre de campaña del 20 de septiembre al 24 de noviembre.</p><p><strong>Conversiones offline:</strong> estado «enviado» en la cola y respuesta correcta registrada. El código vincula ese estado al éxito de la petición. Google usa acciones secundarias; estos envíos no demuestran un cambio de puja ni un aumento de ventas.</p><p><strong>Catálogo:</strong> coincidencia de referencias de producto, no de usuarios. La deduplicación individual de eventos y la atribución completa siguen siendo comprobaciones distintas.</p><p><strong>Confidencialidad:</strong> caso anonimizado. Se muestran agregados; no se publican nombres de clientes, conversaciones, datos personales ni accesos.</p></div></details></section>

        <section className={styles.contact} aria-labelledby="contacto-titulo"><p className={styles.eyebrow}>EL SIGUIENTE PASO</p><h2 id="contacto-titulo">Lo vemos los tres.</h2><p>Una llamada corta para conocer dónde os vendría mejor esta forma de trabajar y elegir una primera cuenta. Como os resulte más cómodo.</p><a className={styles.primary} href="mailto:duque629@gmail.com?subject=Empact%20%C2%B7%20Hablemos%20de%20una%20primera%20cuenta">Hablar con Antonio <span aria-hidden="true">↗</span></a></section>
      </main>
      <footer className={styles.footer}><span>Antonio Duque · Código Fresco</span><span>Preparado para Empact · Noviembre de 2026</span><a href="#contenido">Volver arriba ↑</a></footer>
    </div>
  );
}
