import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Política de Privacidad | Padel Bucaramanga",
    description:
      "Política de privacidad de Padel Bucaramanga: qué datos recopilamos, cómo los usamos y cómo contactarnos.",
    path: "/privacidad"
  });
}

export default function PrivacidadPage(): React.JSX.Element {
  return (
    <article className="prose prose-invert mx-auto max-w-3xl py-10">
      <h1>Política de Privacidad</h1>
      <p>
        <em>Última actualización: febrero 2026</em>
      </p>

      <p>
        Padel Bucaramanga (<strong>padelenbucaramanga.com</strong>) es un directorio
        informativo estático. No recopilamos datos personales directamente.
      </p>

      <h2>Datos que no recopilamos</h2>
      <ul>
        <li>No tenemos formularios de registro ni cuentas de usuario.</li>
        <li>No almacenamos cookies de seguimiento propias.</li>
        <li>No procesamos pagos ni datos financieros.</li>
      </ul>

      <h2>Servicios de terceros</h2>
      <p>
        Este sitio puede cargar contenido de Instagram (embeds). Instagram / Meta
        puede recopilar datos conforme a su propia política de privacidad. Al
        interactuar con esos embeds aceptas sus términos.
      </p>

      <h2>Links externos</h2>
      <p>
        Los enlaces a WhatsApp, EasyCancha, Instagram y Google Maps apuntan a
        plataformas externas con sus propias políticas. No somos responsables de
        su contenido ni sus prácticas de privacidad.
      </p>

      <h2>Contacto</h2>
      <p>
        Para cualquier consulta relacionada con privacidad:{" "}
        <a
          href="https://wa.me/573166229191"
          target="_blank"
          rel="noreferrer noopener"
        >
          WhatsApp +57 316 622 9191
        </a>
        .
      </p>
    </article>
  );
}
