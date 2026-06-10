import { Helmet } from "react-helmet-async";
import { CALENDLY_URL, experiences, technologies } from "../../config/constants";
import { Badge, Button, Card, SectionHeader } from "../../components/ui";

const sectionClass = "mx-auto w-full max-w-site px-6 py-20 sm:px-8 lg:px-10";

// Entries that already exist in `technologies` (constants.ts) under different names are omitted here:
// "React" → "React JS", "TypeScript" → "TypeScript" (exact), "Node.js" → "Node JS", "Docker" → "docker"
const coreStack = [
  "Next.js", "Express", "PostgreSQL",
  "Supabase", "Cloudflare", "OpenAI API", "Claude API",
];

const AI_TOOL_BADGES = new Set(["OpenAI API", "Claude API"]);

const AboutPage = () => {
  const allTech = Array.from(
    new Set([...coreStack, ...technologies.map((t) => t.name)])
  );

  return (
    <>
      <Helmet>
        <title>About — fullstackchris.dev</title>
        <meta
          name="description"
          content="Christophe Crognier is a full-stack web developer and independent programming teacher with over 7,000 hours of teaching experience, specialised in React, Node.js, TypeScript and AI-assisted web development."
        />
      </Helmet>

      {/* Hero */}
      <section className="glow-bg grid-bg relative overflow-hidden border-b border-border">
        <div className={`${sectionClass} py-24`}>
          <Badge variant="accent">About</Badge>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-normal text-white">
            Developer execution and teaching clarity for web builders.
          </h1>
          <p className="mt-6 max-w-prose text-[clamp(1rem,1.6vw,1.2rem)] leading-8 text-secondary">
            I am Christophe Crognier — a full-stack web developer and independent programming teacher with over 7,000
            hours of technical instruction across Bachelor and Master programs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
              Book a call
              <span aria-hidden="true"> →</span>
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              View services
            </Button>
          </div>
        </div>
      </section>

      {/* What I do */}
      <section className={sectionClass}>
        <SectionHeader
          eyebrow="What I do"
          title="Two roles, one clear purpose."
          description="I work as a developer and a teacher. Both inform each other."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card hover className="flex flex-col gap-4">
            <p className="font-mono text-sm text-accent">developer</p>
            <h3 className="font-display text-2xl font-semibold text-white">Full-stack web developer</h3>
            <p className="text-[0.95rem] leading-7 text-secondary">
              I design and build custom web applications from concept to production using React, Node.js, TypeScript,
              PostgreSQL and modern DevOps practices. My work focuses on scalable, maintainable systems and practical
              AI-assisted workflows.
            </p>
            <Button href="/projects" variant="secondary" size="sm" className="mt-auto w-fit">
              View projects
            </Button>
          </Card>
          <Card hover className="flex flex-col gap-4">
            <p className="font-mono text-sm text-accent">teacher</p>
            <h3 className="font-display text-2xl font-semibold text-white">Independent programming teacher</h3>
            <p className="text-[0.95rem] leading-7 text-secondary">
              I have delivered over 7,000 hours of technical training in private higher-education institutions, teaching
              students from Bachelor to Master level. This shaped my ability to clarify complex systems and communicate
              architecture to both technical and non-technical stakeholders.
            </p>
            <Button href="/services/web-project-coaching" variant="secondary" size="sm" className="mt-auto w-fit">
              Coaching service
            </Button>
          </Card>
        </div>
      </section>

      {/* Stack */}
      <section className="border-y border-border bg-surface/55">
        <div className={sectionClass}>
          <SectionHeader eyebrow="Technical stack" title="What I work with." />
          <Card className="mt-10">
            <div className="flex flex-wrap gap-3">
              {allTech.map((tech) => (
                <Badge
                  key={tech}
                  variant={AI_TOOL_BADGES.has(tech) ? "accent" : "default"}
                  dot
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Experience timeline */}
      <section className={sectionClass}>
        <SectionHeader eyebrow="Experience" title="Career highlights." />
        <div className="mt-10 space-y-6">
          {experiences.map((exp) => (
            <Card key={`${exp.title}-${exp.company_name}`} hover className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{exp.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
                    {exp.company_name}
                  </p>
                </div>
                <Badge variant="default">{exp.date}</Badge>
              </div>
              <ul className="space-y-2">
                {exp.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-6 text-secondary">
                    <span className="mt-1 shrink-0 text-accent">›</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface/55">
        <div className={sectionClass}>
          <Card glow className="overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Get in touch</p>
                <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-semibold leading-tight text-white">
                  Bring me your web project.
                </h2>
                <p className="mt-4 max-w-prose text-lg leading-8 text-secondary">
                  I help founders, freelancers and small teams clarify, build and launch web products. Let's talk about
                  what you are building.
                </p>
              </div>
              <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" size="lg">
                Book a call
                <span aria-hidden="true"> →</span>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
