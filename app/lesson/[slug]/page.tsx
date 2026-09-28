import { notFound } from "next/navigation";
import { getLessonBySlug, allLessonSlugs } from "@/lib/lessons";
import LessonView from "@/components/LessonView";

export function generateStaticParams() {
  return allLessonSlugs().map((slug) => ({ slug }));
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) notFound();
  return <LessonView lesson={lesson} />;
}
