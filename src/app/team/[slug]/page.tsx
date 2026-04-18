import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getTeamMemberBySlug,
  getAllTeamSlugs,
  expertiseForMember,
} from "@/data/teamMembers";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllTeamSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const member = getTeamMemberBySlug(params.slug);
  if (!member) return { title: "Team" };
  return {
    title: `${member.name} | QBrix Solutions Team`,
    description: member.shortBio,
  };
}

export default function TeamMemberPage({ params }: Props) {
  const member = getTeamMemberBySlug(params.slug);
  if (!member) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Header />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/team"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-10"
        >
          ← Back to team
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gray-100">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="192px"
                  priority
                  className={member.imageObjectClassName}
                />
              </div>
              <h1 className="mt-6 text-2xl font-bold text-gray-900">
                {member.name}
              </h1>
              <p className="text-blue-700 font-semibold mt-1">{member.role}</p>
              <div className="flex gap-4 mt-6">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-2xl"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-black text-2xl"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-500 hover:text-sky-700 text-2xl"
                  aria-label="Twitter / X"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>

            <div className="md:w-3/5 p-8 md:p-10">
              <section className="mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                  Profile
                </h2>
                <p className="text-gray-700 leading-relaxed">{member.fullBio}</p>
              </section>

              <section className="mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                  Experience
                </h2>
                <ul className="space-y-4">
                  {member.experience.map((exp) => (
                    <li key={`${exp.title}-${exp.organization}`}>
                      <div className="font-semibold text-gray-900">{exp.title}</div>
                      <div className="text-sm text-blue-700">
                        {exp.organization} · {exp.period}
                      </div>
                      {exp.description ? (
                        <p className="text-gray-600 text-sm mt-1">{exp.description}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                  Education
                </h2>
                <ul className="space-y-3">
                  {member.education.map((edu) => (
                    <li key={`${edu.degree}-${edu.institution}`}>
                      <div className="font-medium text-gray-900">{edu.degree}</div>
                      <div className="text-sm text-gray-600">
                        {edu.institution}
                        {edu.year ? ` · ${edu.year}` : ""}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                  Achievements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {member.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                  Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {expertiseForMember(member).map((skill, i) => (
                    <span
                      key={`${member.slug}-ex-${i}-${skill}`}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-900 border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get in touch
          </Link>
          <Link
            href="/team"
            className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            All team members
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
