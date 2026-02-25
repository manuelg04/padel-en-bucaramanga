import Link from "next/link";

export default function NotFoundPage(): React.JSX.Element {
  return (
    <section className="grid gap-4 py-16">
      <h1 className="text-4xl font-black">Página no encontrada</h1>
      <p className="max-w-2xl text-foreground/80">
        El recurso que buscabas no existe o cambió de URL. Usa el hub para navegar entre clubes y guías.
      </p>
      <Link className="text-primary underline" href="/padel-bucaramanga">
        Ir a /padel-bucaramanga
      </Link>
    </section>
  );
}
