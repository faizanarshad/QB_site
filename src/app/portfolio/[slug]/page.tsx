import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getProjectBySlug,
  getAllPortfolioSlugs,
} from "@/data/portfolioProjects";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPortfolioSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.title} | QBrix Portfolio`,
    description: project.summary,
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
        {children}
      </div>
    </section>
  );
}

export default function PortfolioProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Header />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8"
        >
          ← Back to portfolio
        </Link>

        <header className="mb-10">
          <div className="text-6xl mb-4" aria-hidden>
            {project.emoji}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {project.title}
          </h1>
          <p className="text-lg text-gray-600">{project.subtitle}</p>
        </header>

        <Section title="Overview">{project.summary}</Section>
        <Section title="Problem">{project.problem}</Section>
        <Section title="Solution">{project.solution}</Section>

        {project.fullStackDetails ? (
          <Section title="Full-Stack Development Details">
            {project.fullStackDetails}
          </Section>
        ) : null}

        {project.stripeDetails ? (
          <Section title="Stripe Integration Details">
            {project.stripeDetails}
          </Section>
        ) : null}

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Technologies
          </h2>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="px-3 py-1.5 bg-blue-50 text-blue-900 rounded-full text-sm font-medium border border-blue-100"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <Section title="Results">{project.results}</Section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Discuss a similar project
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            All projects
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
