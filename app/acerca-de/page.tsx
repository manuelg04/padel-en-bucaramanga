import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Acerca de Padel Bucaramanga",
    description:
      "Quiénes somos, cómo verificamos la información del directorio y cómo contactar al equipo editorial de Padel Bucaramanga.",
    path: "/acerca-de"
  });
}

export default function AcercaDePage(): React.JSX.Element {
  return (
    <article className="prose prose-invert mx-auto max-w-3xl py-10">
      <h1>Acerca de Padel Bucaramanga</h1>

      <p>
        <strong>Padel Bucaramanga</strong> es un directorio editorial independiente
        dedicado a conectar jugadores con clubes y canchas de pádel en Bucaramanga y
        el área metropolitana (Floridablanca, Girón, Piedecuesta).
      </p>

      <h2>Qué hacemos</h2>
      <p>
        Recopilamos, verificamos y organizamos información pública de clubes: dirección,
        canales de contacto, métodos de reserva y características de cada sede. La
        información proviene de perfiles oficiales en Instagram, EasyCancha y sitios
        web de los propios clubes.
      </p>

      <h2>Metodología editorial</h2>
      <ul>
        <li>Cada ficha de club se actualiza cuando detectamos cambios en fuentes públicas.</li>
        <li>No aceptamos pago por inclusión ni por posicionamiento en el directorio.</li>
        <li>Las guías son contenido evergreen revisado periódicamente.</li>
        <li>
          Si gestionas un club y detectas información incorrecta, escríbenos para
          corregirlo de inmediato.
        </li>
      </ul>

      <h2>Quién lo mantiene</h2>
      <p>
        El sitio es desarrollado y mantenido por{" "}
        <a
          href="https://www.linkedin.com/in/manuel-gonzalez-42481b134/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Manuel Gonzalez
        </a>
        , ingeniero de software senior radicado en Colombia, jugador de pádel y
        apasionado por el deporte local.
      </p>

      <h2>Contacto</h2>
      <p>
        Para correcciones, sugerencias o colaboraciones:{" "}
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
