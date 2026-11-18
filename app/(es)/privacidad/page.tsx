import Link from "next/link";

import { LegalPage } from "../../legal-page";
import { buildMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/site";

export const metadata = buildMetadata({
  title: "Política de privacidad",
  description: "Cómo CodigoFresco recopila, utiliza y protege los datos enviados por visitantes, clientes y usuarios de Instagram.",
  path: "/privacidad",
  index: false,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad" intro="Explicamos qué datos recopilamos, para qué los usamos y qué opciones tienes sobre su tratamiento." updated="18 de noviembre de 2026">
      <section><h2>Responsable y contacto</h2><p className="mt-4">CodigoFresco es responsable del tratamiento descrito en esta política. Puedes escribir a <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> para realizar consultas o ejercer tus derechos.</p></section>
      <section><h2>Datos que recopilamos</h2><ul className="mt-4 list-disc pl-6"><li>Nombre, empresa, correo y teléfono que envías voluntariamente.</li><li>Tipo de proyecto, necesidad, presupuesto, plazo y mensaje.</li><li>Página de origen y parámetros de campaña incluidos en la URL.</li><li>Datos de uso y dispositivo solo cuando aceptas la analítica opcional.</li><li>Datos de Instagram cuando interactúas con la cuenta @dukecrea, según se detalla más abajo.</li></ul></section>
      <section><h2>Finalidades</h2><p className="mt-4">Usamos los datos para responder solicitudes, preparar diagnósticos, dar seguimiento comercial, prestar servicios contratados, proteger el formulario contra abuso y entender el rendimiento de la web cuando existe consentimiento.</p></section>
      <section>
        <h2>Datos de Instagram (Meta)</h2>
        <p className="mt-4">Utilizamos la API de Instagram de Meta en nuestra cuenta <a href="https://www.instagram.com/dukecrea/" target="_blank" rel="noopener noreferrer">@dukecrea</a> para responder automáticamente comentarios y mensajes directos, publicar contenido propio y consultar las métricas de nuestras publicaciones. Esta integración funciona solo sobre nuestra propia cuenta y no accede a perfiles, publicaciones ni mensajes de terceros fuera de las interacciones que tienen lugar con @dukecrea.</p>
        <h3 className="mt-6 text-lg font-bold text-white">Qué datos tratamos</h3>
        <ul className="mt-3 list-disc pl-6">
          <li>El identificador y el nombre de usuario de Instagram de la persona que comenta o nos escribe.</li>
          <li>El texto del comentario o del mensaje directo.</li>
          <li>Métricas agregadas de nuestras publicaciones, como alcance, interacciones y reproducciones, que no identifican a personas concretas.</li>
        </ul>
        <h3 className="mt-6 text-lg font-bold text-white">Para qué los usamos</h3>
        <ul className="mt-3 list-disc pl-6">
          <li>Enviar la respuesta o el recurso solicitado; por ejemplo, cuando alguien comenta «SISTEMA» en una publicación, le enviamos el recurso por mensaje directo.</li>
          <li>Dar seguimiento comercial únicamente cuando la persona lo solicita.</li>
          <li>Mejorar nuestro contenido a partir de las métricas agregadas.</li>
        </ul>
        <h3 className="mt-6 text-lg font-bold text-white">Cesión y conservación</h3>
        <p className="mt-3">No vendemos, alquilamos ni cedemos los datos de Instagram a terceros. Meta Platforms actúa como proveedor de la plataforma y de la API, y trata esos datos conforme a su propia política de privacidad. Conservamos los datos de Instagram durante un máximo de 12 meses desde la última interacción, o hasta que solicites su eliminación, lo que ocurra primero.</p>
        <p className="mt-3">Puedes pedir que eliminemos tus datos de Instagram en cualquier momento siguiendo las instrucciones de la página de <Link href="/eliminacion-de-datos">eliminación de datos de usuario</Link>.</p>
      </section>
      <section><h2>Proveedores y transferencias</h2><p className="mt-4">Podemos procesar información mediante proveedores de alojamiento, base de datos, correo, redes sociales y analítica. Actualmente la web puede utilizar Supabase y Resend para la recepción de leads, y Meta Platforms (API de Instagram) para gestionar las interacciones con la cuenta @dukecrea; Google Analytics, Microsoft Clarity y Vercel Analytics solo se cargan después de aceptar la analítica opcional.</p></section>
      <section><h2>Conservación y seguridad</h2><p className="mt-4">Conservamos los datos durante el tiempo necesario para atender la relación comercial, cumplir obligaciones o resolver reclamaciones; los datos de Instagram siguen el plazo indicado en su sección. Aplicamos controles de acceso y medidas técnicas razonables, aunque ningún sistema conectado a internet puede garantizar riesgo cero.</p></section>
      <section><h2>Tus decisiones</h2><p className="mt-4">Puedes solicitar acceso, corrección o eliminación cuando corresponda; para borrar tus datos, consulta la página de <Link href="/eliminacion-de-datos">eliminación de datos de usuario</Link>. También puedes rechazar o cambiar la analítica opcional desde la <Link href="/cookies">política de cookies</Link>.</p></section>
    </LegalPage>
  );
}
