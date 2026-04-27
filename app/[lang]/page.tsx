import { setRequestLocale } from "next-intl/server";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  setRequestLocale(lang);
  return <main><h1>Grupo ZER</h1></main>;
}
