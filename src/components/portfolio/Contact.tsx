import { ArrowUpRight, Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal, Section } from "./primitives";

const socials = [
  { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
  { label: "GitHub", href: profile.socials.github, icon: Github },
  { label: "Instagram", href: profile.socials.instagram, icon: Instagram },
];

export function Contact() {
  return (
    <>
      <Section id="contact" className="overflow-hidden">
        <div className="glow-orb left-1/2 top-1/3 size-[700px] -translate-x-1/2 bg-lavender opacity-20" />
        <Reveal className="relative">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs text-lavender">07</span>
            <span className="h-px w-10 bg-border" />
            <span className="eyebrow">Contact</span>
          </div>
          <h2 className="font-display text-5xl font-extrabold leading-[0.9] tracking-tight sm:text-8xl">
            <span className="text-chrome">Let's create</span>
            <br />
            <span className="font-serif font-normal italic text-aurora">something new.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center justify-between gap-6 border-b border-border pb-6 transition hover:border-lavender"
            >
              <span className="min-w-0">
                <span className="eyebrow flex items-center gap-2">
                  <Mail className="size-3.5" /> Email
                </span>
                <span className="mt-3 block break-all font-display text-xl font-semibold sm:text-3xl lg:text-4xl">
                  {profile.email}
                </span>
              </span>
              <ArrowUpRight className="size-8 shrink-0 transition group-hover:rotate-45 group-hover:text-lavender" />
            </a>
            <a
              href={profile.phoneHref}
              className="group mt-6 flex items-center justify-between gap-6 border-b border-border pb-6 transition hover:border-electric"
            >
              <span>
                <span className="eyebrow flex items-center gap-2">
                  <Phone className="size-3.5" /> Phone
                </span>
                <span className="mt-3 block font-display text-xl font-semibold sm:text-3xl">{profile.phone}</span>
              </span>
              <ArrowUpRight className="size-8 shrink-0 transition group-hover:rotate-45 group-hover:text-electric" />
            </a>
            <p className="mt-6 flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" /> {profile.location}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center justify-between rounded-2xl px-6 py-5 transition hover:border-lavender/50"
              >
                <span className="flex items-center gap-4">
                  <s.icon className="size-5" strokeWidth={1.5} />
                  <span className="font-display text-lg font-semibold">{s.label}</span>
                </span>
                <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:text-foreground" />
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal className="relative mt-28 text-center">
          <div className="hairline mx-auto mb-12 max-w-md" />
          <blockquote className="mx-auto max-w-3xl font-serif text-3xl italic leading-snug sm:text-5xl">
            “Technology gives us the tools. <span className="text-aurora">Imagination gives them purpose.</span>”
          </blockquote>
          <p className="mt-6 eyebrow">— {profile.name}</p>
        </Reveal>
      </Section>

      <footer className="border-t border-border px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <a href="#top" className="font-mono uppercase tracking-[0.25em] hover:text-foreground">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
