import { Award, GraduationCap, Languages } from "lucide-react";
import { certifications, education, profile } from "@/data/profile";
import { Reveal, Section, SectionHeading, sheenMove } from "./primitives";

export function Credentials() {
  return (
    <Section id="education">
      <SectionHeading
        index="06"
        eyebrow="Education & Credentials"
        title={
          <>
            The <span className="font-serif font-normal italic text-aurora">foundation.</span>
          </>
        }
      />
      <div className="mt-14 grid gap-4 sm:gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="h-full rounded-3xl border border-border bg-surface p-8">
            <div className="mb-8 flex items-center gap-3">
              <GraduationCap className="size-5 text-lavender" strokeWidth={1.5} />
              <span className="eyebrow">Education</span>
            </div>
            <div className="divide-y divide-border">
              {education.map((e) => (
                <div key={e.degree} className="grid gap-2 py-6 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:gap-8">
                  <div>
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">{e.degree}</h3>
                    <p className="mt-1 text-muted-foreground">{e.school}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="font-mono text-sm text-muted-foreground">{e.period}</p>
                    <p className="mt-1 text-lg font-semibold text-chrome">{e.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:gap-6">
          <Reveal delay={0.08}>
            <div onPointerMove={sheenMove} className="card-sheen h-full rounded-3xl border border-border bg-surface p-8">
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <Award className="size-5 text-electric" strokeWidth={1.5} />
                  <span className="eyebrow">Certifications</span>
                </div>
                <ul className="space-y-4">
                  {certifications.map((c) => (
                    <li key={c.name}>
                      <p className="font-display font-semibold">{c.name}</p>
                      <p className="text-sm text-muted-foreground">{c.issuer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="h-full rounded-3xl border border-border bg-surface p-8">
              <div className="mb-6 flex items-center gap-3">
                <Languages className="size-5 text-silver" strokeWidth={1.5} />
                <span className="eyebrow">Languages</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {profile.languages.map((l) => (
                  <li key={l} className="rounded-full border border-border px-4 py-2 text-sm">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
