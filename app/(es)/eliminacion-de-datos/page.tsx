import Link from "next/link";

import { LegalPage } from "../../legal-page";
import { buildMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/site";

export const metadata = buildMetadata({
  title: "Eliminación de datos de usuario",
  description: "Cómo solicitar a CodigoFresco la eliminación de tus datos, incluidos los datos de Instagram asociados a la cuenta @dukecrea.",
  path: "/eliminacion-de-datos",
  index: false,
});

const subject = "Eliminar mis datos";

export default function DataDeletionPage() {
  const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;

  return (
    <LegalPage
      title="Eliminación de datos de usuario"
      intro="Si interactuaste con nuestra cuenta de Instagram @dukecrea o nos enviaste tus datos, puedes pedir que los eliminemos en cualquier momento."
      updated="18 de noviembre de 2026"
    >
      <section>
        <h2>Cómo solicitar la eliminación</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6">
          <li>Escribe un correo a <a href={mailto}>{siteConfig.email}</a>.</li>
          <li>Usa el asunto «{subject}».</li>
          <li>Indica en el mensaje tu nombre de usuario de Instagram (por ejemplo, @tuusuario) y, si nos contactaste por otro medio, el correo o teléfono que utilizaste.</li>
        </ol>
      </section>
      <section>
        <h2>Qué ocurre después</h2>
        <p className="mt-4">Te confirmaremos la recepción de tu solicitud y eliminaremos tus datos en un plazo máximo de 30 días. Esto incluye el identificador y el nombre de usuario de Instagram, el texto de tus comentarios y mensajes almacenados por nuestros sistemas y cualquier dato de seguimiento comercial asociado. Cuando terminemos, te avisaremos por correo.</p>
        <p className="mt-4">Si para verificar tu identidad necesitamos algún dato adicional, te lo pediremos antes de proceder.</p>
      </section>
      <section>
        <h2>Datos que conserva Meta</h2>
        <p className="mt-4">Los comentarios y mensajes que publicas en Instagram también están almacenados por Meta. Puedes borrarlos directamente desde la aplicación de Instagram o gestionar tu información desde la configuración de tu cuenta de Meta.</p>
      </section>
      <section>
        <h2>Más información</h2>
        <p className="mt-4">Consulta nuestra <Link href="/privacidad">política de privacidad</Link> para conocer qué datos tratamos, para qué los usamos y durante cuánto tiempo los conservamos.</p>
      </section>
    </LegalPage>
  );
}
